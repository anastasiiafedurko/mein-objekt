import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPlatform = createAsyncThunk(
  "platform/fetch",
  async (platformId: string) => {
    const response = await fetch(`/api/platform/${platformId}`);

    if (!response.ok) {
      throw new Error("Failed to load platform config");
    }

    return response.json();
  }
);
