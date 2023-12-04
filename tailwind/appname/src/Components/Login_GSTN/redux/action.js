export const LOGIN = 'LOGIN';

export const login = (gstn) => ({
  type: LOGIN,
  payload: { gstn },
});