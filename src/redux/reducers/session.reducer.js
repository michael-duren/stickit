import { SESSION_ACTIONS } from '../actions/session.reducer.actions';

const initialState = {
  sessionId: 0,
  user_id: 0,
  duration: 0,
  completed: false,
  exercises: [],
  completedExercises: [],
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
      console.log('in add exercise to completed', action.payload);
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

    default:
      return state;
  }
};

export default sessionReducer;
