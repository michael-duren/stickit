const express = require('express');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// GET method for getting all types
router.get('/', (req, res) => {
  let requestTypes = 'SELECT * FROM TYPE;';

  pool.query(requestTypes)
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((error) => {
      console.log('Error with get types request:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
