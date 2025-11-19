import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchObject = createAsyncThunk(
  "object/fetch",
  async (objectId: string) => {
    const response = await fetch(`/api/objects/${objectId}`);

    if (!response.ok) {
      throw new Error("Failed to load object");
    }

    return response.json();
  }
);
