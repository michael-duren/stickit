const express = require('express');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

//GET method for reading an exercise by its ID
router.get('/:id', (req, res) => {
  let requestTypes = 'SELECT * FROM TYPE WHERE ID = $1;';

  pool.query(requestTypes, [req.params.id])
  .then((result) => {
    res.status(200).send(result.rows);
  })
  .catch((error) => {
    console.log('Error with get types request:', error);
    res.sendStatus(500)
  });
});

module.exports = router;