import { createAsyncThunk } from "@reduxjs/toolkit";

import type { ObjectItem } from "../../types/ObjectItem";
import type { RootState } from "..";

export const fetchObject = createAsyncThunk<
  ObjectItem,
  string,
  { state: RootState }
>("object/fetch", async (objectId: string, { getState, rejectWithValue }) => {
  const state = getState();
  const cachedObject = state.recentObjects.items.find(
    (obj) => obj.id === objectId
  );

  if (!navigator.onLine) {
    if (cachedObject) return cachedObject;
    return rejectWithValue("Offline and object not cached");
  }

  try {
    const response = await fetch(`/api/objects/${objectId}`);
    if (!response.ok) throw new Error("Failed to load object");
    const data: ObjectItem = await response.json();
    return data;
  } catch (error) {
    if (cachedObject) return cachedObject;
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});
