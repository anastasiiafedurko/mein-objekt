import type { ObjectItem } from "../../types/ObjectItem";

export interface SelectedObjectState {
  selectedObject: ObjectItem | null;
  loading: boolean;
  error: string | null;
}
