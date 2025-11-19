import type { ChatItem } from "../types/ChatItem";

export const objectsQuestions: Record<string, ChatItem[]> = {
  obj1: [
    {
      id: "q1",
      question: "What is the history of this object?",
      answer: "Created in 18th century.",
    },
    { id: "q2", question: "Who is the author?", answer: "Leonardo da Vinci." },
  ],
  obj2: [
    {
      id: "q1",
      question: "When was this made?",
      answer: "It was made in 1905.",
    },
    { id: "q2", question: "What materials?", answer: "Marble and bronze." },
  ],
};
