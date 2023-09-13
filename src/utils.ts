import { NUMBER_OF_QUESTIONS, defaultGame } from "./constants";
import type { Difficulty, GameData, Operator, Question } from "./types";

export const generateNumber = (max: number, min = 1) => {
  return Math.floor(Math.random() * max) + min;
};

export const operatorMap = (operator: Operator) => {
  switch (operator) {
    case "add":
      return "+";
    case "sub":
      return "-";
    case "mul":
      return "x";
    case "div":
      return "/";

    default:
      break;
  }
};

export const generateQuestions = (
  operator: Operator,
  difficulty: Difficulty
): Question[] => {
  const questionCount = NUMBER_OF_QUESTIONS;
  const questions: Question[] = [] as Question[];

  for (let i = 0; i < questionCount; i++) {
    let x: number, y: number, correctAnswer: number, z: number;

    // Generate the operands based on the selected difficulty and operator
    // Replace the logic below with your own based on the selected operator
    if (operator === "add") {
      if (difficulty === "easy") {
        x = generateNumber(5);
        y = generateNumber(5);
        correctAnswer = x + y;
      } else {
        x = generateNumber(10);
        y = generateNumber(10);
        correctAnswer = x + y;
      }
    } else if (operator === "sub") {
      if (difficulty === "easy") {
        x = generateNumber(10);
        y = 10;
        while (y > x) {
          y = generateNumber(10);
        }
        correctAnswer = x - y;
      } else {
        x = generateNumber(20, 10);
        y = 20;
        while (y > x) {
          y = generateNumber(20);
        }
        correctAnswer = x - y;
      }
    } else if (operator === "mul") {
      if (difficulty === "easy") {
        x = generateNumber(5);
        y = generateNumber(5);
        correctAnswer = x * y;
      } else {
        x = generateNumber(10);
        y = generateNumber(10);
        correctAnswer = x * y;
      }
    } else if (operator === "div") {
      if (difficulty === "easy") {
        z = generateNumber(10);
        y = generateNumber(5);
        x = z * y;
        correctAnswer = z;
      } else {
        z = generateNumber(10);
        y = generateNumber(10);
        x = z * y;
        correctAnswer = z;
      }
    } else {
      // Handle other operators
      x = 0;
      y = 0;
      correctAnswer = 0;
    }

    questions.push({
      x,
      y,
      correctAnswer,
      userAnswer: null,
    });
  }

  return questions;
};

// export const calculateScore = (
//   correctAnswers: number,
//   totalTime: number,
//   difficulty: "easy" | "hard"
// ) => {
//   const correctScore = correctAnswers * 10;
//   const difficultyFactor = difficulty === "easy" ? 1 : 2;
//   const totalTimeLimit = 100;

//   console.log("utils.ts 112 totalTime:", totalTime);

//   const timeScore = totalTime > 100 ? 0 : totalTimeLimit - totalTime;
//   const difficultyScore = correctScore * difficultyFactor;

//   const score = correctScore + timeScore + difficultyScore;
//   console.log("endGame.tsx 48 :create a ");

//   return { correctScore, timeScore, difficultyScore, score };
// };

export const createNewGame = (gameData: GameData): GameData => {
  const {
    selectedDifficulty,
    playerName,
    selectedOperator,
    difficultyMultiplier,
  } = gameData;
  return {
    ...defaultGame,
    playerName,
    selectedDifficulty,
    selectedOperator,
    difficultyMultiplier,
    questions: generateQuestions(selectedOperator, selectedDifficulty),
  };
};
