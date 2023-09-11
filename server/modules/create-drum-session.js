// @ts-check
const pool = require('./pool');
const tableTypes = require('../types/table-types');
const sessionFormType = require('../types/session-form');
const sessionObjectType = require('../types/session-object');

/**
 * Represents determineSmartSession function
 * @typedef {function} determineSmartSession
 * @param {sessionFormType.SessionForm} sessionForm - The session form.
 * @returns {Promise<tableTypes.Exercise[]>}
 * this function determines the smart session and returns it, it does not save to db
 */

const determineSmartSession = async (sessionForm) => {
  const { focusAndTypeChoice, timeInMinutes } = sessionForm;

  const chosenTypes = focusAndTypeChoice.reduce((acc, currentVal) => {
    if (Object.values(currentVal)[0].length > 0) {
      return acc + 1;
    }
    return acc;
  }, 0);

  // time per type allotted, - 10 to account for warmup and cooldown
  const timePerType = Math.floor((timeInMinutes - 10) / chosenTypes);

  // array to store exercises
  const drumSession = [];

  //  get exercises based on users selection
  for (let i = 0; i < focusAndTypeChoice.length; i++) {
    if (focusAndTypeChoice[i][i + 1].length < 0) {
      continue; // if no types are selected for this focus, skip it
    } else {
      // if focuses are selected for this type, get 20 random focus exercises
      // from db
      const typeFocuses = focusAndTypeChoice[i][i + 1]; // array of focuses for the type
      for (let focus of typeFocuses) {
        // loop through each focus
        const query =
          'SELECT * FROM exercises WHERE type_id = $1 AND focus_id = $2 ORDER BY RANDOM() LIMIT 20;';
        const queryResponse = await pool.query(query, [i + 1, focus]);
        /** @type {tableTypes.Exercise[]} */
        const exercises = queryResponse.rows;

        if (exercises.length < 1) {
          throw new Error(
            'The server was unable to get exercises from the database with the parameters provided, please check that the database connection is working and that there are an appropriate amount of exercises in the database for the types and focuses chosen'
          ); // error
        }

        // Add exercises to drumSession until time limit is reached for this focus
        let time = 0;
        for (let j = 0; j < exercises.length; j++) {
          // check if adding another exercise would go over the time allowed for this type
          if (time + +exercises[j].minimum_time_minutes > timePerType) {
            break;
          } else {
            drumSession.push(exercises[j]);
            time += +exercises[j].minimum_time_minutes;
          }
        }
      }
    }
  }

  // add warmup and cooldown
  const warmup = await pool.query(
    'SELECT * FROM EXERCISES WHERE WARMUP=TRUE AND MINIMUM_TIME_MINUTES = 5 ORDER BY RANDOM() LIMIT 1;'
  );
  const cooldown = await pool.query(
    'SELECT * FROM EXERCISES WHERE COOLDOWN=TRUE AND MINIMUM_TIME_MINUTES = 5 ORDER BY RANDOM() LIMIT 1;'
  );

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

  const createQuery =
    'INSERT INTO USER_SESSIONS (USER_ID, DURATION, COMPLETED) VALUES($1, $2, $3) RETURNING *';

  const newSessionQueryResult = await pool.query(createQuery, [
    userId,
    sessionForm.timeInMinutes,
    false,
  ]);

  /** @type {tableTypes.UserSession} */
  const newSession = newSessionQueryResult.rows[0];

  // insert each exercise for the session into the user session exercises table
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
    duration: newSession.duration,
    exercises: sessionData,
    completed: false,
  };

  return sessionObj;
};

module.exports = createDrumSession;
