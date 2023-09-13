const express = require('express');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const exercisesRouter = require('./routes/exercises.router');


const sessionRouter = require('./routes/session.router');
const sessionNotesRouter = require('./routes/sessionNotes.router');

const typeRouter = require('./routes/type.router');
const typeFocusRouter = require('./routes/typeFocus.router')


// Express middleware
app.use(express.json());

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/exercises', exercisesRouter);


app.use('/api/user/sessions', sessionRouter);
app.use('/api/user/sessionNotes', sessionNotesRouter);

app.use('/api/types', typeRouter)
app.use('/api/typefocus', typeFocusRouter)


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 8002;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
