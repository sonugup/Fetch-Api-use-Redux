import * as types from "./actionType";

const initialState = {
  albumMusic: [],
  isLoading: false,
  isError: false,
};
const reducer = (oldState = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_MUSIC_RECORD_REQUEST:
      return {
        ...oldState,
        isLoading: true,
      };

    case types.GET_MUSIC_RECORD_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        albumMusic: payload,
      };

    case types.GET_MUSIC_RECORD_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
      };

    default:
      return oldState;
  }
};

export { reducer };
