import { SESSION_USER_DETAILS_ACTIONS } from '../actions/session-user-details.reducer.actions';

const initialState = {
  userExerciseDetails: {},
  userExercisesDetails: [],
};

const sessionUserDetails = (state = initialState, action) => {
  switch (action.type) {
    case SESSION_USER_DETAILS_ACTIONS.SET_USER_EXERCISE_DETAILS:
      return { ...state, userExerciseDetails: action.payload };
    case SESSION_USER_DETAILS_ACTIONS.SET_USER_EXERCISES_DETAILS:
      return { ...state, userExercisesDetails: action.payload };
    default:
      return state;
  }
};

export default sessionUserDetails;
