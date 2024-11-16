import { combineReducers } from "@reduxjs/toolkit";
import { appReducer } from "./reducers/app.reducer";
import { navigationReducer } from "./reducers/navigation.reducer";

const rootReducer = combineReducers({
  app: appReducer,
  navigation: navigationReducer
});
export default rootReducer;
