import { put, takeLatest } from 'redux-saga/effects';
import { SESSION_USER_DETAILS_SAGA_ACTIONS } from '../actions/session-user-details.saga.actions';
import { SESSION_USER_DETAILS_ACTIONS } from '../actions/session-user-details.reducer.actions';

function* getUserExerciseDetails(action) {
  try {
    const { sessionId, exerciseId } = action.payload;
    const response = yield fetch(
      `/api/user/exercises/${sessionId}/${exerciseId}`
    );
    const userExerciseDetails = yield response.json();
    yield put({
      type: SESSION_USER_DETAILS_ACTIONS.SET_USER_EXERCISE_DETAILS,
      payload: userExerciseDetails,
    });
  } catch (error) {
    console.error('User exercise details get request failed', error);
  }
}

function* getUserExercisesDetails(action) {
  try {
    const response = yield fetch(`/api/user/exercises`);
    const userExercisesDetails = yield response.json();
    yield put({
      type: SESSION_USER_DETAILS_ACTIONS.SET_USER_EXERCISES_DETAILS,
      payload: userExercisesDetails,
    });
  } catch (error) {
    console.log('User exercises details get request failed', error);
  }
}

function* sessionUserDetailsSaga() {
  yield takeLatest(
    SESSION_USER_DETAILS_SAGA_ACTIONS.GET_USER_EXERCISE_DETAILS,
    getUserExerciseDetails
  );
  yield takeLatest(
    SESSION_USER_DETAILS_SAGA_ACTIONS.GET_USER_EXERCISES_DETAILS,
    getUserExercisesDetails
  );
}

export default sessionUserDetailsSaga;
