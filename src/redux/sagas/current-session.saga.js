import { SESSION_SAGA_ACTIONS } from '../actions/session.saga.actions';
import { SESSION_ACTIONS } from '../actions/session.reducer.actions';
import { takeLatest, put } from 'redux-saga/effects';

function* completeExercise(action) {
  console.log('in completeExercise saga', action.payload);
  try {
    const response = yield fetch(
      `/api/user/sessions/${action.payload.sessionId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.payload),
      }
    );
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }

    // remove exercise from exercises array and add to completedd exercises
    console.log(
      'action.payload.currentExercise',
      action.payload.currentExercise
    );
    yield put({
      type: SESSION_ACTIONS.ADD_EXERCISE_TO_COMPLETED,
      payload: action.payload.currentExercise,
    });
  } catch (error) {
    console.log('Session post request failed', error);
  }
}

function* completeSession(action) {
  try {
    console.log();
  } catch (error) {}
}

function* currentSessionSaga() {
  yield takeLatest(SESSION_SAGA_ACTIONS.COMPLETE_EXERCISE, completeExercise);
  yield takeLatest(SESSION_SAGA_ACTIONS.COMPLETE_SESSION, completeSession);
}

export default currentSessionSaga;
