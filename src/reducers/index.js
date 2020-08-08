import { combineReducers } from "redux";
import authReducer from "./authReducer";
import fetchingReducer from "./fetchingReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  fetching: fetchingReducer,
  error: errorReducer,
});
