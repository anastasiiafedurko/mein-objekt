import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { mockRecentObjects } from "../../dammyData/recentObjects";
import type { ChatItem } from "../../types/ChatItem";
import type { ObjectChatState } from "./types";
import { fetchObjectQuestions } from "./actions";

const stored = localStorage.getItem("objectChat");
const initialState: ObjectChatState = stored ? JSON.parse(stored) : {};

const objectChatSlice = createSlice({
  name: "objectChat",
  initialState,
  reducers: {
    selectQuestion(
      state,
      action: PayloadAction<{ objectId: string; item: ChatItem }>
    ) {
      const { objectId, item } = action.payload;
      if (!state[objectId]) return;

      state[objectId].chatHistory.push(item);
      state[objectId].availableQuestions = state[
        objectId
      ].availableQuestions.filter((q) => q.id !== item.id);

      localStorage.setItem("objectChat", JSON.stringify(state));
    },
    resetChat(state, action: PayloadAction<{ objectId: string }>) {
      const { objectId } = action.payload;
      if (state[objectId]) {
        state[objectId].chatHistory = [];
        const obj = mockRecentObjects.find((o) => o.id === objectId);
        state[objectId].availableQuestions = obj?.chat || [];
        localStorage.setItem("objectChat", JSON.stringify(state));
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchObjectQuestions.fulfilled, (state, action) => {
      const objectId = action.meta.arg;
      if (!state[objectId]) {
        state[objectId] = {
          chatHistory: [],
          availableQuestions: action.payload,
        };
      }
    });
  },
});

export const { selectQuestion, resetChat } = objectChatSlice.actions;
export default objectChatSlice.reducer;
