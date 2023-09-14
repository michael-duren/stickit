import { put, takeLatest } from 'redux-saga/effects';
import { SESSION_ACTIONS } from '../actions/session.reducer.actions';
import { SESSION_FORM_SAGA_ACTIONS } from '../actions/session-form.saga.actions';
import { SESSION_FORM_ACTIONS } from '../actions/session-form.reducer.actions';

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
    yield put({ type: SESSION_ACTIONS.SET_EXERCISES, payload: session });
  } catch (error) {
    console.log('Session post request failed', error);
  }
}

function* getTypes(action) {
  try {
    const response = yield fetch('/api/types');
    const types = yield response.json();
    yield put({ type: SESSION_FORM_ACTIONS.SET_TYPES, payload: types });
  } catch (error) {}
}

function* sessionFormSaga() {
  yield takeLatest(SESSION_FORM_SAGA_ACTIONS.POST_SESSION, postSessionForm);
  yield takeLatest(SESSION_FORM_SAGA_ACTIONS.GET_TYPES, getTypes);
}

export default sessionFormSaga;
