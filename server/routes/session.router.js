const express = require('express');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

//GET method for reading the user's exercises by session
router.get('/:id', (req, res) => {
  let userSessionExercises = 'SELECT * FROM user_session_exercises WHERE user_id = $1 AND exercise_id =$2;';

  pool.query(userSessionExercises, [req.user.id, req.params.id])
  .then((result) => {
    res.status(200).send(result.rows);
  })
  .catch((error) => {
    console.log('Error with get exercises request:', error);
    res.sendStatus(500)
  });
});

module.exports = router;