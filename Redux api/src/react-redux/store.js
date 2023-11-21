import { applyMiddleware, combineReducers, legacy_createStore ,compose} from "redux";
import { reducer as AuthReducer } from "../AuthReducer/reducer.js";
import { reducer as AppReducer, reducer } from "./reducer.js";
import thank from 'redux-thunk'


// const rootReducer = combineReducers({ AuthReducer, AppReducer });
// const store = legacy_createStore(rootReducer);
const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
    reducer,
    composeEnhancers(applyMiddleware(thank))
)

export { store };
