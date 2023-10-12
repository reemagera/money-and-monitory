import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import accountReducer from "./reducers";
import UserReducer from "./UserReducer";
import tutorialReducer from "./TutorialsReducers";

const rootReducer = combineReducers({
    data: accountReducer,
    customer: UserReducer,
    tutorialReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))
export default store;