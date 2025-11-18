import type { ObjectItem } from "../../../types/ObjectItem";

export interface RecentObjectsListProps {
  objects: ObjectItem[];
  onClick?: (obj: ObjectItem) => void;
}
