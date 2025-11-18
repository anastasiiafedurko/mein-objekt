import type { ObjectItem } from "../../../../types/ObjectItem";

export interface RecentObjectCardProps {
  obj: ObjectItem;
  onClick?: (obj: ObjectItem) => void;
}
