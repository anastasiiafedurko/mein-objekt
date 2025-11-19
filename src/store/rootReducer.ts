import { combineReducers } from "@reduxjs/toolkit";
import platformReducer from "./platform/platformSlice";
import recentObjectsReducer from "./recentObjects/recentObjectsSlice";
import selectedObjectReducer from "./selectedObject/selectedObjectSlice";
import objectChatReducer from "./chat/objectChatSlice";
import uiThemeReducer from "./uiTheme/uiThemeSlice";

const rootReducer = combineReducers({
  platform: platformReducer,
  recentObjects: recentObjectsReducer,
  selectedObject: selectedObjectReducer,
  objectChat: objectChatReducer,
  uiTheme: uiThemeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
