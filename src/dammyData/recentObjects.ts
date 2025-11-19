import type { ObjectItem } from "../types/ObjectItem";

export const mockRecentObjects: ObjectItem[] = [
  {
    id: "1",
    name: "Mona Lisa",
    imageUrl: "/images/mona-lisa.jpg",
    description:
      "The Mona Lisa is a half-length portrait painting by the Italian artist Leonardo da Vinci. Considered an archetypal masterpiece of the Italian Renaissance,[4][5] it has been described as the best known, the most visited, the most written about, the most sung about, [and] the most parodied work of art in the world. The painting's novel qualities include the subject's enigmatic expression, monumentality of the composition, the subtle modelling of forms, and the atmospheric illusionism.",
    metadata: "Leonardo da Vinci, 1503",
    chat: [
      { id: "q1", question: "Who painted this?", answer: "Leonardo da Vinci" },
      {
        id: "q2",
        question: "When was it painted?",
        answer: "Around 1503–1506",
      },
      {
        id: "q3",
        question: "Where is it displayed?",
        answer: "Louvre Museum, Paris",
      },
    ],
  },
  {
    id: "2",
    name: "The Starry Night",
    imageUrl: "/images/starry-night.jpg",
    description: "A painting by Vincent van Gogh.",
    metadata: "Vincent van Gogh, 1889",
    chat: [
      { id: "q1", question: "Who painted this?", answer: "Vincent van Gogh" },
      { id: "q2", question: "When was it painted?", answer: "1889" },
      {
        id: "q3",
        question: "What inspired it?",
        answer: "The view from his asylum room in Saint-Rémy",
      },
    ],
  },
  {
    id: "3",
    name: "The Thinker",
    imageUrl: "/images/the-thinker.jpg",
    description: "A sculpture by Auguste Rodin.",
    metadata: "Auguste Rodin, 1904",
    chat: [
      { id: "q1", question: "Who created it?", answer: "Auguste Rodin" },
      { id: "q2", question: "When was it created?", answer: "1904" },
      { id: "q3", question: "What is the material?", answer: "Bronze" },
    ],
  },
  {
    id: "4",
    name: "Girl with a Pearl Earring",
    imageUrl: "/images/girl-pearl.jpg",
    description: "A painting by Johannes Vermeer.",
    metadata: "Johannes Vermeer, 1665",
    chat: [
      { id: "q1", question: "Who painted this?", answer: "Johannes Vermeer" },
      { id: "q2", question: "When was it painted?", answer: "1665" },
      { id: "q3", question: "What is the medium?", answer: "Oil on canvas" },
    ],
  },
];
