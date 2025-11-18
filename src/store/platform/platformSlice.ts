import { createSlice } from "@reduxjs/toolkit";
import { louvreConfig } from "../../dammyData/platformConfig";
import type { PlatformState } from "./types";
import { fetchPlatform } from "./actions";

const initialState: PlatformState = {
  config: null,
  loading: false,
  error: null,
};

const platformSlice = createSlice({
  name: "platform",
  initialState,
  reducers: {
    setLocalConfig(state, action) {
      state.config = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlatform.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlatform.fulfilled, (state, action) => {
        state.config = action.payload;
        state.loading = false;
      })
      .addCase(fetchPlatform.rejected, (state) => {
        state.config = louvreConfig;
        state.loading = false;
        state.error = "Using fallback config";
      });
  },
});

export const { setLocalConfig } = platformSlice.actions;
export default platformSlice.reducer;
