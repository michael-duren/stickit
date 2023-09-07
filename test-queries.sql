-- example queries that should work after the database is setup
-- some of these should also work for server queries
-- select all times user has completed an exercise
select
	*
from
	user_session_exercises
where
	user_id = 1
	AND exercise_id = 1;

-- when a user would get there session back this is the information we need to supply
-- first the session we would store this in a variable in the server code
-- example:
select
	*
from
	user_sessions
where
	user_id = 1
	AND id = 1;

-- next we need to get the exercises for this session
-- we would need both the info from USER_SESSION_EXERCISES and EXERCISES
-- get a sessions exercises by session id and user id
SELECT
	*
FROM
	user_session_exercises
	JOIN exercises ON exercises.id = user_session_exercises.exercise_id
WHERE
	--          replace with session id and user id variables on server
	user_session_exercises.user_id = 1
	AND user_session_exercises.session_id = 1;