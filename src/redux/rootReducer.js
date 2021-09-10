import {combineReducers} from "redux";
import {checkReducer} from "./checkReducer";


export const rootReducer = combineReducers({
  main: checkReducer
})