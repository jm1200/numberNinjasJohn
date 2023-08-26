export interface Question {
  x: number;
  y: number;
  correctAnswer: number;
  userAnswer: number | null;
}

export type Operator = "add" | "sub" | "mul" | "div" | null;
export type Difficulty = "easy" | "hard";

export interface GameData {
  datePlayed: Date;
  selectedOperator: Operator | null;
  selectedDifficulty: Difficulty | null;
  playerName: string;
  questions: Question[] | null;
  elapsedTime: number | null;
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
