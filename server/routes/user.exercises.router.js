const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// updates EXERCISES in the user_session_exercises table
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

module.exports = router;
