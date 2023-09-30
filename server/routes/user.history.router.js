const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// get exercises for this week
router.get('/week', (req, res) => {
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
