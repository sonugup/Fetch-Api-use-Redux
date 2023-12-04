import { LOGIN } from './action';

const initialState = {
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      // Handle login logic, update state, etc.
      return { ...state, user: { gstn: action.payload.gstn } };
    default:
      return state;
  }
};

export default authReducer;