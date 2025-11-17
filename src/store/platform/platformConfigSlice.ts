import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PlatformConfig } from "../../types/PlatformConfig";
import { ludwigConfig } from "../../dammyData/platformConfig";

interface PlatformState {
  config: PlatformConfig | null;
  loading: boolean;
  error: string | null;
}

const initialState: PlatformState = {
  config: null,
  loading: false,
  error: null,
};

export const fetchPlatformConfig = createAsyncThunk<PlatformConfig, string>(
  "platformConfig/fetch",
  async (platformId: string) => {
    const response = await fetch(`/api/platform/${platformId}`);

    if (!response.ok) {
      throw new Error("Failed to load platform config");
    }

    return response.json();
  }
);

const platformConfigSlice = createSlice({
  name: "platformConfig",
  initialState,
  reducers: {
    setLocalConfig(state, action) {
      state.config = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlatformConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlatformConfig.fulfilled, (state, action) => {
        state.config = action.payload;
        state.loading = false;
      })
      .addCase(fetchPlatformConfig.rejected, (state) => {
        state.config = ludwigConfig;
        state.loading = false;
        state.error = "Using fallback config";
      });
  },
});

export const { setLocalConfig } = platformConfigSlice.actions;
export default platformConfigSlice.reducer;
