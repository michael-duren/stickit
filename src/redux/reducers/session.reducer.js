import { SESSION_ACTIONS } from '../actions/session.reducer.actions';

const initialState = {
  exercises: [],
  isComplete: false,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SESSION_ACTIONS.SET_EXERCISES:
      return {
        ...state,
        exercises: action.payload,
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
