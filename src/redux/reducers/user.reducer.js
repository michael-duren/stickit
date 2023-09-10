import { USER_ACTIONS } from '../actions/user.reducer.actions';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.payload;
    case USER_ACTIONS.UNSET_USER:
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userReducer;
