import *as types from "./actionType"

const initialState = {
    loading: false,
    isAuth: null,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            }
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuth:action.payload,
                error: false
            }

        case types.REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
};

export { reducer }