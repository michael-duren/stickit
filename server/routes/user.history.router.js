const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// get exercises for this week
router.get('/week', (req, res) => {
  const userId = req.user.id;
  const userCurrentWeekSessionsQuery = `
    SELECT S.*, COUNT(E) AS total_exercises 
    FROM user_sessions AS S
    JOIN user_session_exercises AS E
    ON S.id = E.session_id
    WHERE S.user_id = $1
    GROUP BY S.id
    HAVING S.completed_at >= NOW() - INTERVAL '7 DAYS'
    ORDER BY S.completed_at DESC;
    `;
  pool
    .query(userCurrentWeekSessionsQuery, [userId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error('Error getting user sessions', error);
      res.sendStatus(500);
    });
});

// get exercises for the current month
router.get('/month', (req, res) => {
  const userId = req.user.id;
  const userCurrentSessionMonthQuery = `
    SELECT S.*, COUNT(E) AS total_exercises 
    FROM user_sessions AS S
    JOIN user_session_exercises AS E
    ON S.id = E.session_id
    WHERE S.user_id = $1
    GROUP BY S.id
    HAVING
    EXTRACT(MONTH from S.completed_at) = EXTRACT(MONTH FROM NOW())
    AND
    EXTRACT(YEAR FROM S.completed_at) = EXTRACT(YEAR FROM NOW())
    ORDER BY S.completed_at DESC;
    `;
  pool
    .query(userCurrentSessionMonthQuery, [userId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error('Error getting user sessions', error);
      res.sendStatus(500);
    });
});

// get exercises for the current year
router.get('/year', (req, res) => {
  const userId = req.user.id;
  const userCurrentSessionYearQuery = `
    SELECT S.*, COUNT(E) AS total_exercises 
    FROM user_sessions AS S
    JOIN user_session_exercises AS E
    ON S.id = E.session_id
    WHERE S.user_id = $1
    GROUP BY S.id
    HAVING S.completed_at >= NOW() - INTERVAL '1 YEAR'
    ORDER BY S.completed_at DESC;
  `;

  pool
    .query(userCurrentSessionYearQuery, [userId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error('Error getting user sessions', error);
      res.sendStatus(500);
    });
});

// get exercises for all time
router.get('/all', (req, res) => {
  const userId = req.user.id;
  const userAllSessionsQuery = `
    SELECT S.*, COUNT(E) AS total_exercises
    FROM user_sessions AS S
    JOIN user_session_exercises AS E
    ON S.id = E.session_id
    WHERE S.user_id = $1
    GROUP BY S.id
    ORDER BY S.completed_at DESC;
  `;

  pool
    .query(userAllSessionsQuery, [userId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error('Error getting user sessions', error);
      res.sendStatus(500);
    });
});

module.exports = router;
