import type { GameData, Question } from "./types";

export const NUMBER_OF_QUESTIONS = 3;

export const operators = [
  { value: "add", label: "Addition" },
  { value: "sub", label: "Subtraction" },
  { value: "mul", label: "Multiplication" },
  { value: "div", label: "Division" },
];

export const difficulties = [
  { value: "easy", label: "Easy" },
  { value: "hard", label: "Hard" },
];

export const defaultGame: GameData = {
  playerName: "",
  datePlayed: new Date(),
  questions: [] as Question[],
  elapsedTime: 0,
  selectedDifficulty: "easy",
  selectedOperator: "add",
  totalScore: 0,
  correctAnswersScore: 0,
  difficultyMultiplier: 1,
  timeScore: 0,
};
