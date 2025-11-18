import { combineReducers } from "@reduxjs/toolkit";
import platformReducer from "./platform/platformSlice";
import recentObjectsReducer from "./recentObjects/recentObjectsSlice";

const rootReducer = combineReducers({
  platform: platformReducer,
  recentObjects: recentObjectsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
