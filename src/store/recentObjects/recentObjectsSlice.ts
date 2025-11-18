import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RecentObjectsState } from "./types";
import type { ObjectItem } from "../../types/ObjectItem";

const LOCAL_STORAGE_KEY = "recentObjects";

const initialState: RecentObjectsState = {
  items: [],
};

const loadFromLocalStorage = (): ObjectItem[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Failed to load recent objects:", err);
    return [];
  }
};

const saveToLocalStorage = (items: ObjectItem[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error("Failed to save recent objects:", err);
  }
};

const recentObjectsSlice = createSlice({
  name: "recentObjects",
  initialState,
  reducers: {
    loadRecentObjects(state) {
      state.items = loadFromLocalStorage();
    },
    addRecentObject(state, action: PayloadAction<ObjectItem>) {
      const exists = state.items.find((obj) => obj.id === action.payload.id);
      if (!exists) {
        state.items.unshift(action.payload);
      }
      saveToLocalStorage(state.items);
    },
    clearRecentObjects(state) {
      state.items = [];
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    },
  },
});

export const { loadRecentObjects, addRecentObject, clearRecentObjects } =
  recentObjectsSlice.actions;
export default recentObjectsSlice.reducer;
