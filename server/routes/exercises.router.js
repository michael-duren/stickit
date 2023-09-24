const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

//GET method for reading an exercise by its ID
router.get('/:id', (req, res) => {
  let requestExercise = 'SELECT * FROM EXERCISES WHERE ID = $1;';

  pool
    .query(requestExercise, [req.params.id])
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((error) => {
      console.log('Error with get exercises request:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
