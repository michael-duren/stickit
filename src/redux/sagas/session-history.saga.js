import { put, takeLatest } from 'redux-saga/effects';
import { SESSION_HISTORY_ACTIONS } from '../actions/session-history.reducer.actions';
import { SESSION_HISTORY_SAGA_ACTIONS } from '../actions/session-history.saga.actions';

function* getSessionsForThisWeek(action) {
  try {
    const response = yield fetch(`/api/user/history/week`);
    const weekSessions = yield response.json();
    yield put({
      type: SESSION_HISTORY_ACTIONS.SET_SESSIONS_THIS_WEEK,
      payload: weekSessions,
    });
  } catch (error) {
    console.error('Could not load users week sessions', error);
  }
}

function* getSessionsForThisMonth(action) {
  try {
    const response = yield fetch(`/api/user/history/month`);
    const monthSessions = yield response.json();
    yield put({
      type: SESSION_HISTORY_ACTIONS.SET_SESSIONS_THIS_MONTH,
      payload: monthSessions,
    });
  } catch (error) {
    console.error('Could not load users week sessions', error);
  }
}

function* getSessionsForThisYear(action) {
  try {
    const response = yield fetch(`/api/user/history/year`);
    const yearSessions = yield response.json();
    yield put({
      type: SESSION_HISTORY_ACTIONS.SET_SESSIONS_THIS_YEAR,
      payload: yearSessions,
    });
  } catch (error) {
    console.error('Could not load users week sessions', error);
  }
}

function* getAllSessions(action) {
  try {
    const response = yield fetch(`/api/user/history/all`);
    const allSessions = yield response.json();
    yield put({
      type: SESSION_HISTORY_ACTIONS.SET_ALL_SESSIONS,
      payload: allSessions,
    });
  } catch (error) {
    console.error('Could not load users week sessions', error);
  }
}

function* sessionHistorySaga() {
  yield takeLatest(
    SESSION_HISTORY_SAGA_ACTIONS.GET_SESSIONS_THIS_WEEK,
    getSessionsForThisWeek
  );
  yield takeLatest(
    SESSION_HISTORY_SAGA_ACTIONS.GET_SESSIONS_THIS_MONTH,
    getSessionsForThisMonth
  );
  yield takeLatest(
    SESSION_HISTORY_SAGA_ACTIONS.GET_SESSIONS_THIS_YEAR,
    getSessionsForThisYear
  );
  yield takeLatest(
    SESSION_HISTORY_SAGA_ACTIONS.GET_ALL_SESSIONS,
    getAllSessions
  );
}

export default sessionHistorySaga;
