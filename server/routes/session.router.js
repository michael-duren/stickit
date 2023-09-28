const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// JS DOC types
const createDrumSession = require('../modules/create-drum-session');
const sessionFormType = require('../types/session-form');
const sessionObjTypes = require('../types/session-object');

//GET method for reading the user's exercises data by session
router.get('/:id', (req, res) => {
  let userSessionExercises = `
  SELECT E.*, F.id as Hearted FROM 
  user_session_exercises as E 
  left join user_favorite_exercises as F 
  on E.exercise_id = F.exercise_id  
  WHERE E.user_id = $1 AND E.session_id = $2; 
  `;

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

// PUT for updating session on completion
router.put('/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const userId = req.user.id;
  const query = `UPDATE user_sessions SET "completed" = true, "completed_at" = NOW() WHERE id = $1 AND user_id = $2;`;

  if (
    typeof Number(sessionId) !== 'number' ||
    typeof Number(userId) !== 'number'
  ) {
    return res.status(400).send({
      message: 'Missing required fields',
      statusCode: 400,
    });
  }

  try {
    pool.query(query, [sessionId, userId]).then((result) => {
      res.status(204).send({
        message: 'Session completed',
        statusCode: 204,
      });
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: 'Something went wrong when updating the session to complete',
      statusCode: 500,
    });
  }
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
