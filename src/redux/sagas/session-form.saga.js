import { put, takeLatest } from 'redux-saga/effects';
import { SESSION_FORM_SAGA_ACTIONS } from '../actions/session-form.saga.actions';

// worker Saga: will be fired on "FETCH_USER" actions
function* postSessionForm(action) {
  try {
    const response = yield fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    });
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    // get back a session which is a array of exercises
    const session = yield response.json();

    // set session exercises in session reducer
    yield put({ type: 'SET_EXERCISES', payload: session });
  } catch (error) {
    console.log('Session post request failed', error);
  }
}

function* sessionFormSaga() {
  yield takeLatest(SESSION_FORM_SAGA_ACTIONS.POST_SESSION, postSessionForm);
}

export default sessionFormSaga;
