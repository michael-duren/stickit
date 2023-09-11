const express = require('express');
const router = express.Router();
const createDrumSession = require('../modules/create-drum-session');
const pool = require('../modules/pool');
const sessionFormType = require('../types/session-form');
const sessionObjTypes = require('../types/session-object');

router.get('/', async (req, res) => {
  const exercises = await pool.query('SELECT * FROM exercises LIMIT 10;');
  console.log('exercises:', exercises.rows);
  res.sendStatus(200);
});

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

  try {
    /** @type {sessionObjTypes.SessionObject} */
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
