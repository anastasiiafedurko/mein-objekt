import type { RootState } from "..";

export const getRecentObjects = (state: RootState) => state.recentObjects.items;
