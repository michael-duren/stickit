const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET method for reading a user's notes to a respective session
router.get('/:id', (req, res) => {
  let sessionNotesQuery = `
  SELECT * FROM user_session_exercises
  JOIN exercises ON exercises.id = user_session_exercises.exercise_id
  WHERE user_session_exercises.user_id = $1
  AND user_session_exercises.session_id = $2;`;

  pool.query(sessionNotesQuery, [req.user.id, req.params.id])
  .then((result) => {
    console.log('Error with get sessionNotesQuery', error);
    res.sendStatus(500)
  });
});