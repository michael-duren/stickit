import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import sessionFormSaga from './session-form.saga';
import currentSessionSaga from './current-session.saga';
import sessionUserDetailsSaga from './session-userdetails.saga';
import sessionHistorySaga from './session-history.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    userSaga(),
    sessionFormSaga(),
    currentSessionSaga(),
    loginSaga(), // login saga is now registered
    registrationSaga(),
    sessionUserDetailsSaga(),
    sessionHistorySaga(),
  ]);
}
