import { SESSION_SAGA_ACTIONS } from '../actions/session.saga.actions';
import { SESSION_ACTIONS } from '../actions/session.reducer.actions';
import { takeLatest, put } from 'redux-saga/effects';
import { toast } from 'react-hot-toast';

function* refreshExercise(action) {
  // set loading to true
  yield put({
    type: SESSION_ACTIONS.SET_IS_REFRESHING_EXERCISES,
    payload: true,
  });
  try {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    yield sleep(1000);

    const response = yield fetch(
      `/api/user/exercises/refresh/${action.payload.sessionId}`,
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

    const newExercise = yield response.json();

    yield put({
      type: SESSION_ACTIONS.SET_REFRESHED_EXERCISE, // set new exercise in exercises array
      payload: newExercise,
    });

    yield put({
      type: SESSION_ACTIONS.SET_IS_REFRESHING_EXERCISES,
      payload: false,
    });
    yield toast.success('Exercise refreshed!');
  } catch (e) {
    console.error(e);
    toast.error('Error refreshing exercise');

    yield put({
      type: SESSION_ACTIONS.SET_IS_REFRESHING_EXERCISES,
      payload: false,
    });
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
