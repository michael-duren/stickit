// @ts-check
const pool = require('./pool');
const tableTypes = require('../types/table-types');
const sessionFormType = require('../types/session-form');
const sessionObjectType = require('../types/session-object');

const roundToClosestFive = (num) => Math.round(num / 5) * 5;

/**
 * Represents determineSmartSession function
 * @typedef {function} determineSmartSession
 * @param {sessionFormType.SessionForm} sessionForm - The session form.
 * @returns {Promise<tableTypes.Exercise[]>}
 * this function determines the smart session and returns it, it does not save to db
 */
const determineSmartSession = async (sessionForm) => {
  const { focusAndTypeChoice, timeInMinutes } = sessionForm;

  // throw error because we cannot generate a session under ten minutes
  if (timeInMinutes < 10) {
    throw new Error(
      'The time limit for the session must be at least 10 minutes'
    );
  }

  // get warmup and cooldown exercises first
  const warmup = await pool.query(
    'SELECT * FROM EXERCISES WHERE WARMUP=TRUE AND MINIMUM_TIME_MINUTES = 5 ORDER BY RANDOM() LIMIT 1;'
  );
  const cooldown = await pool.query(
    'SELECT * FROM EXERCISES WHERE COOLDOWN=TRUE AND MINIMUM_TIME_MINUTES = 5 ORDER BY RANDOM() LIMIT 1;'
  );

  // if timeinminutes is 10, then we just have time for two exercises warm up and cooldown
  if (timeInMinutes === 10) {
    return [warmup.rows[0], cooldown.rows[0]];
  }

  /** @type {sessionFormType.FocusAndTypeChoice} */
  const chosenTypes = {}; // determine what types of exercises the user selected

  for (let i = 0; i < Object.keys(focusAndTypeChoice).length; i++) {
    if (focusAndTypeChoice[i + 1].length > 0) {
      chosenTypes[i + 1] = focusAndTypeChoice[i + 1]; // if the type has focuses it is added to the chostenType object
    }
  }

  if (timeInMinutes === 15) {
    const randomType =
      Object.keys(chosenTypes)[
        Math.floor(Math.random() * Object.keys(chosenTypes).length)
      ];
    const randomExercise = await pool.query(
      'SELECT * FROM exercises WHERE minimum_time_minutes = 5 AND type_id = $1 AND focus_id = $2  ORDER BY RANDOM() LIMIT 1;',
      [randomType, chosenTypes[randomType][0]]
    );
    return [warmup.rows[0], randomExercise.rows[0], cooldown.rows[0]];
  }

  if (Object.keys(chosenTypes).length === 0) {
    throw new Error('No types were provided with focuses, cannot continue');
  }

  // time per type allotted, - 10 to account for warmup and cooldown
  const timePerType = Math.floor(
    (timeInMinutes - 10) / Object.keys(chosenTypes).length
  );

  // array to store exercises
  let drumSession = [];

  //  get exercises based on users selection, first loop through each type
  for (let type of Object.keys(chosenTypes)) {
    const typeFocuses = chosenTypes[type]; // array of focuses for the type
    const timePerFocus = roundToClosestFive(timePerType / typeFocuses.length); // get time per focus and round to closest 5 mins

    // loop through each focus of that type
    for (let focus of typeFocuses) {
      const query =
        'SELECT * FROM exercises WHERE type_id = $1 AND focus_id = $2 ORDER BY RANDOM();'; // select all exercises of that type and focus ordered by random
      const queryResponse = await pool.query(query, [type, focus]);
      /** @type {tableTypes.Exercise[]} */
      const exercises = queryResponse.rows;

      if (exercises.length < 1) {
        // if we did not get any exercises back then throw err
        throw new Error(
          'The server was unable to get exercises from the database with the parameters provided, please check that the database connection is working and that there are an appropriate amount of exercises in the database for the types and focuses chosen'
        );
      }

      // Add exercises to drumSession until time limit is reached for this focus
      let time = 0;
      for (let ex of exercises) {
        // if adding another exercise does not go over the time limit for this focus then add it
        if (time + Number(ex.minimum_time_minutes) < timePerFocus) {
          drumSession.push(ex);
          time += Number(ex.minimum_time_minutes);
        }
        // if adding another exercise would equal the time limit for this focus then add it and break
        else if (time + Number(ex.minimum_time_minutes) === timePerFocus) {
          drumSession.push(ex);
          break;
        }
      }
    }
  }
  // get the sessions current duration
  const drumSessionsDuration = drumSession.reduce((acc, exercise) => {
    return acc + Number(exercise.minimum_time_minutes);
  }, 0);

  // if the duration of the session is less than the time limit then add another exercise
  if (drumSessionsDuration + 10 < timeInMinutes) {
    const randomType =
      Object.keys(chosenTypes)[
        Math.floor(Math.random() * Object.keys(chosenTypes).length)
      ];
    const randomExercise = await pool.query(
      'SELECT * FROM exercises WHERE minimum_time_minutes = 5 AND type_id = $1 AND focus_id = $2  ORDER BY RANDOM() LIMIT 1;',
      [randomType, chosenTypes[randomType][0]]
    );
    drumSession.push(randomExercise.rows[0]);
  }

  // if the duration of the session is greater than the time limit then remove an exercise
  if (drumSessionsDuration + 10 > timeInMinutes) {
    const difference = drumSessionsDuration + 10 - timeInMinutes;
    for (let exercise of drumSession) {
      if (Number(exercise.minimum_time_minutes) === difference) {
        drumSession = drumSession.filter((ex) => ex.id !== exercise.id);
        break;
      }
    }
  }

  return [warmup.rows[0], ...drumSession, cooldown.rows[0]];
};

/**
 * Represents createDrumSession function
 * @typedef {function} createDrumSession
 * @param {sessionFormType.SessionForm} sessionForm - The session form.session
 * @param {number} userId
 * @returns {Promise<sessionObjectType.SessionObject>}
 */

const createDrumSession = async (sessionForm, userId) => {
  // get smart session, at this point nothing has been created in db
  const sessionData = await determineSmartSession(sessionForm);
  if (sessionData.length === 0) {
    throw new Error(
      'There was a problem genearting the smart session, the session data array is empty'
    );
  }
  const totalExerciseDuration = sessionData.reduce((acc, exercise) => {
    if (exercise) {
      return acc + Number(exercise.minimum_time_minutes);
    }
    return acc;
  }, 0);

  if (totalExerciseDuration < 10) {
    throw new Error(
      'There was a problem genearting the smart session, the total time of exercises is 10 mins or less'
    );
  }

  const createQuery =
    'INSERT INTO USER_SESSIONS (USER_ID, DURATION, COMPLETED) VALUES($1, $2, $3) RETURNING *';

  const newSessionQueryResult = await pool.query(createQuery, [
    userId,
    sessionForm.timeInMinutes,
    false,
  ]);

  /** @type {tableTypes.UserSession} */
  const newSession = newSessionQueryResult.rows[0];

  // insert each exercise for the session into the user session exercises table & get duration of exercises
  // Promise.all
  // Wrap a begin and commit around this
  for (let exercise of sessionData) {
    await pool.query(
      'INSERT INTO USER_SESSION_EXERCISES (USER_ID, EXERCISE_ID, SESSION_ID, COMPLETED) VALUES ($1, $2, $3, $4)',
      [userId, exercise.id, newSession.id, false]
    );
  }

  // create object to be sent to client for users session
  /** @type {sessionObjectType.SessionObject} */
  const sessionObj = {
    sessionId: newSession.id,
    user_id: userId,
    duration: totalExerciseDuration,
    exercises: sessionData,
    completed: false,
  };

  return sessionObj;
};

module.exports = createDrumSession;
