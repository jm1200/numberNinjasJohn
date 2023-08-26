"use client";

import { useState } from "react";
import { Button } from "./button";

// Define the operators and their labels
const operators = [
  { value: "addition", label: "Addition" },
  { value: "subtraction", label: "Subtraction" },
  { value: "multiplication", label: "Multiplication" },
  { value: "division", label: "Division" },
];

// Define the difficulty levels and their labels
const difficulties = [
  { value: "easy", label: "Easy" },
  { value: "hard", label: "Hard" },
];

export default function Game() {
  const [selectedOperators, setSelectedOperators] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const handleOperatorChange = (operatorValue: string) => {
    if (selectedOperators.includes(operatorValue)) {
      setSelectedOperators(
        selectedOperators.filter((operator) => operator !== operatorValue)
      );
    } else {
      setSelectedOperators([...selectedOperators, operatorValue]);
    }
  };

  const handleDifficultyChange = (difficultyValue: string) => {
    setSelectedDifficulty(difficultyValue);
  };

  const startGame = () => {
    if (selectedOperators.length > 0 && selectedDifficulty) {
      // Logic to start the game with the selected operators and difficulty
      console.log(
        `Start game with operators: ${selectedOperators.join(
          ", "
        )}, difficulty: ${selectedDifficulty}`
      );
    }
  };

  return (
    <div>
      <h2>Select Game Options</h2>
      <div>
        <p>Select Operator(s):</p>
        <div className="flex">
          {operators.map((operator) => (
            <Button
              key={operator.value}
              className={`mr-2 ${
                selectedOperators.includes(operator.value)
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
              onClick={() => handleOperatorChange(operator.value)}
            >
              {operator.label}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <p>Select Difficulty:</p>
        <div className="flex">
          {difficulties.map((difficulty) => (
            <Button
              key={difficulty.value}
              className={`mr-2 ${
                selectedDifficulty === difficulty.value
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
              onClick={() => handleDifficultyChange(difficulty.value)}
            >
              {difficulty.label}
            </Button>
          ))}
        </div>
      </div>
      <Button
        onClick={startGame}
        disabled={selectedOperators.length === 0 || !selectedDifficulty}
      >
        Start Game
      </Button>
    </div>
  );
}
