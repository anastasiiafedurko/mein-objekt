import { configureStore } from "@reduxjs/toolkit";
import platformConfigReducer from "./platform/platformConfigSlice";

export const store = configureStore({
  reducer: {
    platformConfig: platformConfigReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
