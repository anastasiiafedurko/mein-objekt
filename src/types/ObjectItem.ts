import type { ChatItem } from "./ChatItem";

export interface ObjectItem {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  metadata: string;
  chat: ChatItem[];
}
