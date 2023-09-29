const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// get a users exercise details for a given exercise and session
router.get('/:sessionid/:exerciseid', (req, res) => {
  const exerciseId = req.params.exerciseid;
  const sessionId = req.params.sessionid;
  const userId = req.user.id;
  const userExerciseQuery = `
      SELECT E.*, F.exercise_id as hearted
      FROM user_session_exercises as E
      LEFT JOIN user_favorite_exercises as F
      ON E.exercise_id = F.exercise_id
      WHERE E.exercise_id = $1 AND E.user_id = $2 AND E.session_id = $3;
    `;
  pool
    .query(userExerciseQuery, [exerciseId, userId, sessionId])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log('Error with get exercises request:', error);
      res.sendStatus(500);
    });
});

// see if exercise is hearted
router.get('/heart/:id', async (req, res) => {
  const exerciseId = req.params.id;
  const userId = req.user.id;

  const heartedExerciseQuery = `SELECT * FROM user_favorite_exercises WHERE exercise_id = $1 AND user_id = $2;`;
  try {
    const heart = await pool.query(heartedExerciseQuery, [exerciseId, userId]);
    res.status(200).send(heart.rows);
  } catch (error) {
    console.log('Error with heart exercise request:', error);
    res.status(500).send({
      message: `Error with heart exercise request: ${error}`,
      statusCode: 500,
    });
  }
});

// hearting a exercise
router.post('/heart/:id', async (req, res) => {
  const exerciseId = req.params.id;
  const userId = req.user.id;
  const heartExerciseQuery = `INSERT INTO user_favorite_exercises (exercise_id, user_id) VALUES ($1, $2);`;
  try {
    const result = await pool.query(heartExerciseQuery, [exerciseId, userId]);
    if (result.rowCount === 0) {
      return res.status(400).send({
        message: 'Error with heart exercise request',
        statusCode: 400,
      });
    }
    res.sendStatus(201);
  } catch (error) {
    console.log('Error with heart exercise request:', error);
    res.status(500).send({
      message: `Error with heart exercise request: ${error}`,
      statusCode: 500,
    });
  }
});

// unhearting a exercise
router.delete('/heart/:id', async (req, res) => {
  const exerciseId = req.params.id;
  const userId = req.user.id;
  const unheartExerciseQuery = `DELETE FROM user_favorite_exercises WHERE exercise_id = $1 AND user_id = $2;`;

  try {
    const result = await pool.query(unheartExerciseQuery, [exerciseId, userId]);
    if (result.rowCount === 0) {
      return res.status(400).send({
        message: 'Error with unheart exercise request',
        statusCode: 400,
      });
    }

    res.sendStatus(204);
  } catch (error) {
    console.log('Error with unheart exercise request:', error);
    res.status(500).send({
      message: `Error with unheart exercise request: ${error}`,
      statusCode: 500,
    });
  }
});

// updates EXERCISES in the user_session_exercises table
router.put('/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const { completedTempo, exerciseId, exerciseNotes } = req.body; // get this from body

  let userSessionExercises = `UPDATE user_session_exercises
     SET "completed_at" = NOW(),
      "completed_tempo" = $1,
      "completed" = true,
      "exercise_notes" = $5
     WHERE session_id = $2 AND user_id = $3 AND exercise_id = $4;`;
  pool
    .query(userSessionExercises, [
      completedTempo,
      sessionId,
      req.user.id,
      exerciseId,
      exerciseNotes,
    ])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error with get exercises request:', error);
      res.sendStatus(500);
    });
});

router.put('/refresh/:sessionId', async (req, res) => {
  // we need the session id, exercise id, order, type, and focuses
  console.log('GOT ME', req.body.exercise);
  const { sessionId } = req.params;

  const { exercise } = req.body; // get this from body
  const { exercise_order, id, type_id, focus_id } = exercise;
  console.log('exercise', exercise);

  if (!sessionId || !id || !exercise_order || !type_id || !focus_id) {
    return res.status(400).send({
      message: 'Please provide all required information',
      statusCode: 400,
    });
  }
  const client = await pool.connect();
  try {
    // start transaction
    await client.query('BEGIN');

    // check if the current exists and user is allowed to access it
    const currentUserSessionExerciseQuery = `
    SELECT * FROM
    user_session_exercises 
    WHERE session_id = $1
    AND user_id = $2
    AND exercise_id = $3;
    `;
    const currentUserSessionExercise = await client.query(
      currentUserSessionExerciseQuery,
      [sessionId, req.user.id, id]
    );

    if (currentUserSessionExercise.rows.length === 0) {
      return res.status(403).send({
        message: 'You are not authorized to update this exercise',
        status: 403,
      });
    }

    // Find a random exercise that has the same type and focuses that will replace previous exercise and is not the same as the previous exercise
    let newExerciseQuery;
    let newExerciseResult;

    // if first exercise in session, get a warmup exercise
    if (exercise_order === 1) {
      newExerciseQuery = `SELECT * FROM exercises WHERE type_id = $1 AND focus_id = $2 AND id != $3 AND warmup = $4 AND minimum_time_minutes = $5 ORDER BY RANDOM() LIMIT 1;`;
      newExerciseResult = await client.query(newExerciseQuery, [
        type_id,
        focus_id,
        id,
        true,
        exercise.minimum_time_minutes,
      ]);
      // if cooldown, get a cooldown exercise
    } else if (exercise.cooldown) {
      newExerciseQuery = `SELECT * FROM exercises WHERE type_id = $1 AND focus_id = $2 AND id != $3 AND cooldown = $4 AND minimum_time_minutes = $5 ORDER BY RANDOM() LIMIT 1;`;
      newExerciseResult = await client.query(newExerciseQuery, [
        type_id,
        focus_id,
        id,
        true,
        exercise.minimum_time_minutes,
      ]);
      // else get any exercise
    } else {
      newExerciseQuery = `SELECT * FROM exercises WHERE type_id = $1 AND focus_id = $2 AND id != $3 AND minimum_time_minutes = $4 ORDER BY RANDOM() LIMIT 1;`;
      newExerciseResult = await client.query(newExerciseQuery, [
        type_id,
        focus_id,
        id,
        exercise.minimum_time_minutes,
      ]);
    }
    console.log(newExerciseResult.rows);

    // if no exercise is found, throw an error
    if (newExerciseResult.rows.length === 0) {
      throw new Error(
        'The server was unable to get exercises from the database with the parameters provided, please check that the database connection is working and that there are an appropriate amount of exercises in the database for the types and focuses chosen'
      );
    }

    // new exercise
    const newExercise = newExerciseResult.rows[0];

    // locate the current exercise that needs to be refreshed and remove it from the session
    const deleteExerciseQuery = `DELETE FROM user_session_exercises WHERE session_id = $1 AND user_id = $2 AND exercise_id = $3;`;
    await client.query(deleteExerciseQuery, [sessionId, req.user.id, id]);

    //  add the new exercise to the session, replacing the old one and update the order
    const addExerciseQuery = `
    INSERT INTO user_session_exercises
    (session_id, user_id, exercise_id, exercise_order, completed)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`;

    const insertionResult = await client.query(addExerciseQuery, [
      sessionId,
      req.user.id,
      newExercise.id,
      exercise_order,
      false,
    ]);

    // IF INSERTION FAILS ROLLBACK DELETION
    if (insertionResult.rows.length === 0) {
      throw new Error(
        'The server was unable to add the new exercise to the session'
      );
    }

    // send new exercise to client with the exercise order
    res.status(201).send({ ...newExercise, exercise_order });

    // end transaction
    await client.query('COMMIT');
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: `Error updating exercise: ${error}`,
      statusCode: 500,
    });
    await client.query('ROLLBACK');
  } finally {
    client.release(); // release client back to pool
  }
});

module.exports = router;
