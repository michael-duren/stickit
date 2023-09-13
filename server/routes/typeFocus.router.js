const express = require('express');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');


const router = express.Router();

// GET method for getting all focuses associated with a specific type
router.get('/:typeId', (req, res) => {
  const typeId = req.params.typeId;
  const requestFocuses = 'SELECT * FROM focus WHERE type_id = $1;';

  pool.query(requestFocuses, [typeId])
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((error) => {
      console.error('Error with get focuses request:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
