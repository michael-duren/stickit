import { put, takeLatest } from 'redux-saga/effects';
import { ERRORS_ACTIONS } from '../actions/errors.reducer.actions';
import { LOGIN_SAGA_ACTIONS } from '../actions/login.saga.actions';
import { REGISTER_SAGA_ACTIONS } from '../actions/register.saga.actions';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: ERRORS_ACTIONS.CLEAR_REGISTRATION_ERROR });

    // passes the username and password from the payload to the server
    const response = yield fetch('/api/user/register', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    });
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    // automatically log a user in after registration
    yield put({ type: LOGIN_SAGA_ACTIONS.LOGIN, payload: action.payload });

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: 'SET_TO_LOGIN_MODE' }); // not sure what this does, cant find a reducer or saga that calls this
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: ERRORS_ACTIONS.REGISTRATION_FAILED });
  }
}

function* registrationSaga() {
  yield takeLatest(REGISTER_SAGA_ACTIONS.REGISTER, registerUser);
}

export default registrationSaga;
