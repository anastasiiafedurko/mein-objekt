import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SelectedObjectState } from "./types";
import { fetchObject } from "./actions";
import { mockRecentObjects } from "../../dammyData/recentObjects";
import type { ObjectItem } from "../../types/ObjectItem";

const initialState: SelectedObjectState = {
  selectedObject: null,
  loading: false,
  error: null,
};

const selectedObjectSlice = createSlice({
  name: "selectedObject",
  initialState,
  reducers: {
    setSelectedObject(state, action: PayloadAction<ObjectItem>) {
      state.selectedObject = action.payload;
    },
    clearSelectedObject(state) {
      state.selectedObject = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchObject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchObject.fulfilled, (state, action) => {
        state.selectedObject = action.payload;
        state.loading = false;
      })
      .addCase(fetchObject.rejected, (state) => {
        state.selectedObject = mockRecentObjects[0];
        state.loading = false;
        state.error = "Using fallback config";
      });
  },
});

export const { setSelectedObject } = selectedObjectSlice.actions;
export default selectedObjectSlice.reducer;
