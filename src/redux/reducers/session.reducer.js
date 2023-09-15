import { SESSION_ACTIONS } from '../actions/session.reducer.actions';

const initialState = {
  sessionId: 0,
  user_id: 0,
  duration: 0,
  completed: false,
  exercises: [],
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SESSION_ACTIONS.SET_SESSION:
      return action.payload;
    case SESSION_ACTIONS.SET_EXERCISES:
      return {
        ...state,
        session: action.payload,
      };
    case SESSION_ACTIONS.SET_IS_COMPLETE:
      return {
        ...state,
        isComplete: action.payload,
      };
    case SESSION_ACTIONS.RESET_SESSION:
      return initialState;

    default:
      return state;
  }
};

export default sessionReducer;
