import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { louvreConfig } from "../../dammyData/platformConfig";
import type { PlatformState } from "./types";
import { fetchPlatform } from "./actions";

const initialState: PlatformState = {
  config: null,
  platformId: null,
  loading: false,
  error: null,
};

const platformSlice = createSlice({
  name: "platform",
  initialState,
  reducers: {
    setLocalConfig(
      state,
      action: PayloadAction<{ platformId: string; config: any }>
    ) {
      state.config = action.payload.config;
      state.platformId = action.payload.platformId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlatform.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlatform.fulfilled, (state, action) => {
        state.config = action.payload.config;
        state.platformId = action.payload.platformId;
        state.loading = false;
      })
      .addCase(fetchPlatform.rejected, (state) => {
        // TODO: for backend
        // if (state.platformId === action.meta.arg) {
        //   state.config = state.config ?? louvreConfig;
        // } else {
        //   state.config = null;
        // }
        // state.loading = false;
        // state.error = "Using fallback config or offline";

        state.config = state.config ?? louvreConfig;
        state.loading = false;
        state.error = "Using fallback config or offline";
      });
  },
});

export const { setLocalConfig } = platformSlice.actions;
export default platformSlice.reducer;
