import { combineReducers } from "redux";

import { reducer } from "./reducer";

const rootReducer = combineReducers({
    user: reducer
})

export default rootReducer;