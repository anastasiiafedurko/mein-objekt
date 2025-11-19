import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ChatItem } from "../../types/ChatItem";
import { mockRecentObjects } from "../../dammyData/recentObjects";

export const fetchObjectQuestions = createAsyncThunk<ChatItem[], string>(
  "objectChat/fetchObjectQuestions",
  async (objectId) => {
    const object = mockRecentObjects.find((obj) => obj.id === objectId);
    return new Promise<ChatItem[]>((resolve) => {
      setTimeout(() => resolve(object?.chat || []), 300);
    });
  }
);
