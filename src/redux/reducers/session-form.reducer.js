import { SESSION_FORM_ACTIONS } from '../actions/session-form.reducer.actions';

const initialState = {
  types: [],
  selectedTypes: [], // will be an array of type ids
  focusAndTypeChoice: { 1: [], 2: [], 3: [], 4: [] },
  timeInMinutes: 0,
};

const sessionFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case SESSION_FORM_ACTIONS.SET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case SESSION_FORM_ACTIONS.SET_SELECTED_TYPE:
      // toggle selected type
      if (state.selectedTypes.includes(action.payload)) {
        return {
          ...state,
          selectedTypes: [
            ...state.selectedTypes.filter((type) => type !== action.payload),
          ],
        };
      } else {
        return {
          ...state,
          selectedTypes: [...state.selectedTypes, action.payload],
        };
      }
    case SESSION_FORM_ACTIONS.SET_SELECTED_TYPE_FOCUS: // payload {type: 1, focus: 1}
      if (
        state.focusAndTypeChoice[action.payload.type].includes(
          // if we have the selected focus remove it (toggle)
          action.payload.focus
        )
      ) {
        return {
          ...state,
          focusAndTypeChoice: {
            ...state.focusAndTypeChoice,
            [action.payload.type]: [
              ...state.focusAndTypeChoice[action.payload.type].filter(
                (focus) => focus !== action.payload.focus
              ),
            ],
          },
        };
      } else {
        return {
          ...state,
          focusAndTypeChoice: {
            ...state.focusAndTypeChoice,
            [action.payload.type]: [
              ...state.focusAndTypeChoice[action.payload.type],
              action.payload.focus,
            ],
          },
        };
      }
    case SESSION_FORM_ACTIONS.REMOVE_SELECTED_TYPE:
      return {
        ...state,
        selectedTypes: [
          ...state.selectedTypes.filter((type) => type !== action.payload),
        ],
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
