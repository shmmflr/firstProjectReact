import {combineReducers} from "redux";
import userReduces from "./users/index.js";

const rootReducer = combineReducers({
    ...userReduces
})

export default rootReducer;