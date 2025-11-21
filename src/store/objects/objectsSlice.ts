import { createSlice } from "@reduxjs/toolkit";
import type { ObjectsState } from "./types";
import { allObjects } from "../../dammyData/allObjects";

const initialState: ObjectsState = {
  items: [],
};

const objectsSlice = createSlice({
  name: "objects",
  initialState,
  reducers: {
    setItems(state) {
      state.items = allObjects;
    },
  },
});

export const { setItems } = objectsSlice.actions;
export default objectsSlice.reducer;
