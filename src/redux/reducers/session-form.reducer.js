import { SESSION_FORM_ACTIONS } from '../actions/session-form.reducer.actions';

const initialState = {
  focus: [],
  speedAndAgilityTypes: [],
  creativityAndImprovisationTypes: [],
  styleAndVocabularyTypes: [],
  precisionAndTimekeepingTypes: [],
  timeInMinutes: 0,
};

const sessionFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case SESSION_FORM_ACTIONS.SET_FOCUS:
      return {
        ...state,
        focus: action.payload,
      };
    case SESSION_FORM_ACTIONS.SET_SPEED_AND_AGILITY_TYPES:
      return {
        ...state,
        speedAndAgilityTypes: action.payload,
      };
    case SESSION_FORM_ACTIONS.SET_CREATIVITY_AND_IMPROVISATION_TYPES:
      return {
        ...state,
        creativityAndImprovisationTypes: action.payload,
      };
    case SESSION_FORM_ACTIONS.SET_STYLE_AND_VOCABULARY_TYPES:
      return {
        ...state,
        styleAndVocabularyTypes: action.payload,
      };
    case SESSION_FORM_ACTIONS.SET_PRECISION_AND_TIMEKEEPING_TYPES:
      return {
        ...state,
        precisionAndTimekeepingTypes: action.payload,
      };
    case SESSION_FORM_ACTIONS.SET_TIME_IN_MINUTES:
      return {
        ...state,
        timeInMinutes: action.payload,
      };
    default:
      return state;
  }
};

export default sessionFormReducer;
