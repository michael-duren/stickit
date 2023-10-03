import { SESSION_HISTORY_ACTIONS } from '../actions/session-history.reducer.actions';

const initialState = {
  sessionsThisWeek: [],
  sessionsThisMonth: [],
  sessionsThisYear: [],
  allSessions: [],
};

const sessionHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SESSION_HISTORY_ACTIONS.SET_SESSIONS_THIS_WEEK:
      return { ...state, sessionsThisWeek: action.payload };
    case SESSION_HISTORY_ACTIONS.SET_SESSIONS_THIS_MONTH:
      return { ...state, sessionsThisMonth: action.payload };
    case SESSION_HISTORY_ACTIONS.SET_SESSIONS_THIS_YEAR:
      return { ...state, sessionsThisYear: action.payload };
    case SESSION_HISTORY_ACTIONS.SET_ALL_SESSIONS:
      return { ...state, allSessions: action.payload };
    default:
      return state;
  }
};

export default sessionHistoryReducer;
