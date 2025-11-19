import type { ChatItem } from "../../types/ChatItem";

export interface ObjectChatState {
  [objectId: string]: {
    availableQuestions: ChatItem[];
    chatHistory: ChatItem[];
  };
}
