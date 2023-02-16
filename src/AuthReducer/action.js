import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "./actionType.js";

const login_request = () => {
  return { type: LOGIN_REQUEST };
};

const login_success = (payload) => {
  return { type: LOGIN_SUCCESS, payload };
};

const login_failure = () => {
  return { type: LOGIN_FAILURE };
};







