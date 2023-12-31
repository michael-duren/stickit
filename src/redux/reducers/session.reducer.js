import { SESSION_ACTIONS } from '../actions/session.reducer.actions';
import './session.reducer.types';

/**
 * @param {import('./session.reducer.types.js').Session} initialState
 */
const initialState = {
  sessionId: 0,
  user_id: 0,
  duration: 0,
  completed: false,
  exercises: [],
  completedExercises: [],
  isRefreshingExercise: false,
  refreshingItemOrder: 0,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SESSION_ACTIONS.SET_SESSION:
      return {
        ...state,
        ...action.payload,
      };
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
    case SESSION_ACTIONS.SET_CURRENT_EXERCISE:
      return {
        ...state,
        currentExercise: action.payload,
      };
    case SESSION_ACTIONS.RESET_SESSION:
      return initialState;

    case SESSION_ACTIONS.ADD_EXERCISE_TO_COMPLETED:
      return {
        ...state,
        exercises: state.exercises.filter(
          (exercise) => exercise.id !== action.payload.id
        ),
        completedExercises: [...state.completedExercises, action.payload],
      };
    case SESSION_ACTIONS.RESET_COMPLETED_EXERCISES:
      return {
        ...state,
        completedExercises: [],
      };
    case SESSION_ACTIONS.SET_IS_REFRESHING_EXERCISES:
      return {
        ...state,
        isRefreshingExercise: action.payload,
      };
    case SESSION_ACTIONS.SET_REFRESHED_EXERCISE:
      const { exercise_order } = action.payload;
      return {
        ...state,
        exercises: [
          ...state.exercises.filter((exercise) => {
            return exercise.exercise_order !== exercise_order;
          }),
          action.payload,
        ].sort((a, b) => a.exercise_order - b.exercise_order),
      };
    case SESSION_ACTIONS.SET_REFRESHING_ORDER_NUMBER:
      return {
        ...state,
        refreshingItemOrder: action.payload,
      };

    default:
      return state;
  }
};

export default sessionReducer;
