import { SESSION_SAGA_ACTIONS } from '../actions/session.saga.actions';
import { SESSION_ACTIONS } from '../actions/session.reducer.actions';
import { takeLatest, put } from 'redux-saga/effects';

function* refreshExercise(action) {
  try {
    console.log('in refresh exercise', action.payload);
  } catch (e) {
    console.error(e);
  }
}

function* completeExercise(action) {
  try {
    const response = yield fetch(
      `/api/user/exercises/${action.payload.sessionId}`,
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

    yield put({
      type: SESSION_ACTIONS.ADD_EXERCISE_TO_COMPLETED,
      payload: action.payload.currentExercise,
    });
  } catch (error) {
    console.log('Session exercise put request failed', error);
  }
}

function* completeSession(action) {
  try {
    const response = yield fetch(`/api/user/sessions/${action.payload}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }, // no body
    });
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
  } catch (error) {
    console.log('Session put request failed', error);
  }
}

function* currentSessionSaga() {
  yield takeLatest(SESSION_SAGA_ACTIONS.COMPLETE_EXERCISE, completeExercise);
  yield takeLatest(SESSION_SAGA_ACTIONS.COMPLETE_SESSION, completeSession);
  yield takeLatest(SESSION_SAGA_ACTIONS.REFRESH_EXERCISE, refreshExercise);
}

export default currentSessionSaga;
