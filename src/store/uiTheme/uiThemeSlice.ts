import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UIThemeState } from "./types";

export type ThemeMode = "light" | "dark";

const saved = localStorage.getItem("uiThemeMode") as ThemeMode | null;

const initialState: UIThemeState = {
  mode: saved || "light",
};

const uiThemeSlice = createSlice({
  name: "uiTheme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("uiThemeMode", state.mode);
    },
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
      localStorage.setItem("uiThemeMode", action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = uiThemeSlice.actions;
export default uiThemeSlice.reducer;
