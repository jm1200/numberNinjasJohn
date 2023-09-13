export interface Question {
  x: number;
  y: number;
  correctAnswer: number;
  userAnswer: number | null;
}

export type Operator = "add" | "sub" | "mul" | "div";
export type Difficulty = "easy" | "hard";

export interface GameData {
  datePlayed: Date;
  selectedOperator: Operator;
  selectedDifficulty: Difficulty;
  playerName: string;
  questions: Question[];
  elapsedTime: number;
  correctAnswersScore: number;
  timeScore: number;
  difficultyMultiplier: number;
  totalScore: number;
}

export enum GamePhase {
  HOME,
  OPTIONS,
  COUNTDOWN,
  QUESTIONS,
  END_GAME,
}
