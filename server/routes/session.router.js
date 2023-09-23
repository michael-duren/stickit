const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const moment = require('moment');

// JS DOC types
const createDrumSession = require('../modules/create-drum-session');
const sessionFormType = require('../types/session-form');
const sessionObjTypes = require('../types/session-object');

//GET method for reading the user's exercises by session
router.get('/:id', (req, res) => {
  let userSessionExercises =
    'SELECT * FROM user_session_exercises WHERE user_id = $1 AND exercise_id =$2;';

  pool
    .query(userSessionExercises, [req.user.id, req.params.id])
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((error) => {
      console.log('Error with get exercises request:', error);
      res.sendStatus(500);
    });
});

router.put('/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const { completedTempo, exerciseId, exerciseNotes } = req.body; // get this from body
  console.log(exerciseNotes);
  let userSessionExercises = `UPDATE user_session_exercises
     SET "completed_at" = NOW(),
      "completed_tempo" = $1,
      "completed" = true,
      "exercise_notes" = $5
     WHERE session_id = $2 AND user_id = $3 AND exercise_id = $4;`;
  //I dont know how to get COMPLETED_TEMPO and COMPLETED from the front end useStates.
  //optional add in notes to the table
  //here is the fetch inside the console to check it
  /*
      fetch('/api/user/sessions/1/1/', {
      method: "PUT",
      headers: {"Content-Type": "application/json"}})
      */

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

// POST for creating session based on params
router.post('/', async (req, res) => {
  /** @type {sessionFormType.SessionForm} */
  const sessionForm = req.body;
  const { focusAndTypeChoice, timeInMinutes } = sessionForm;

  if (!focusAndTypeChoice || !timeInMinutes) {
    return res.status(400).send({
      message: 'Missing required fields',
      statusCode: 400,
    });
  }

  if (!req.user) {
    return res.status(401).send({
      message: 'Error, you might be signed in to access this resource',
      statusCode: 401,
    });
  }

  try {
    /** @type {sessionObjTypes.SessionObject} */
    console.log('user id', req.user.id);
    const session = await createDrumSession(sessionForm, req.user.id);

    res.status(201).send(session);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message:
        'Something went wrong when determining the smart session. Please reach out to support',
      statusCode: 500,
    });
  }
});

module.exports = router;
