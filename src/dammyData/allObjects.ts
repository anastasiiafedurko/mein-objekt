import type { ObjectItem } from "../types/ObjectItem";

export const allObjects: ObjectItem[] = [
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
  {
    id: "5",
    name: "The Persistence of Memory",
    imageUrl: "/images/persistence-of-memory.jpg",
    description:
      "A surreal painting by Salvador Dalí, famous for its melting clocks.",
    metadata: "Salvador Dalí, 1931",
    chat: [
      { id: "q1", question: "Who painted this?", answer: "Salvador Dalí" },
      { id: "q2", question: "When was it painted?", answer: "1931" },
      { id: "q3", question: "What style is it?", answer: "Surrealism" },
    ],
  },
  {
    id: "6",
    name: "David",
    imageUrl: "/images/david.jpg",
    description:
      "A masterpiece of Renaissance sculpture created by Michelangelo.",
    metadata: "Michelangelo, 1504",
    chat: [
      { id: "q1", question: "Who sculpted this?", answer: "Michelangelo" },
      { id: "q2", question: "When was it created?", answer: "1501–1504" },
      { id: "q3", question: "What is the material?", answer: "Marble" },
    ],
  },
  {
    id: "7",
    name: "The Birth of Venus",
    imageUrl: "/images/birth-of-venus.jpg",
    description:
      "A famous painting by Sandro Botticelli depicting the goddess Venus.",
    metadata: "Sandro Botticelli, 1486",
    chat: [
      { id: "q1", question: "Who painted this?", answer: "Sandro Botticelli" },
      { id: "q2", question: "When was it painted?", answer: "1486" },
      {
        id: "q3",
        question: "Where is it displayed?",
        answer: "Uffizi Gallery, Florence",
      },
    ],
  },
];
