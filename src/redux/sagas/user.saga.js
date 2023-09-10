import { put, takeLatest } from 'redux-saga/effects';
import { USER_ACTIONS } from '../actions/user.reducer.actions';
import { USER_SAGA_ACTIONS } from '../actions/user.saga.actions';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const response = yield fetch('/api/user');
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    const user = yield response.json();

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: USER_ACTIONS.SET_USER, payload: user });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* userSaga() {
  yield takeLatest(USER_SAGA_ACTIONS.FETCH_USER, fetchUser);
}

export default userSaga;
