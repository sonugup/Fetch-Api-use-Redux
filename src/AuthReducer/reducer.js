import { LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionType";

const initialState = {
  isAuth: false,
  isAuthLoading: false,
  token: null,
};

const reducer = (oldState = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return {}
      case LOGIN_SUCCESS:
    default:
      return oldState;
  }
};

export { reducer };


