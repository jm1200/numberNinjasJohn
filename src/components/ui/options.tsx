import { type Dispatch, type SetStateAction, useState } from "react";
import { Button } from "./button";
import {
  type Difficulty,
  type GameData,
  GamePhase,
  type Operator,
} from "../../types";
import { InputNameForm } from "./inputNameForm";
import { generateQuestions } from "../../utils";
import { Input } from "./input";
import Scoreboard from "./scoreboard";

interface OptionsProps {
  playerName: string;
  setPlayerName: Dispatch<SetStateAction<string>>;
  setGameData: Dispatch<SetStateAction<GameData>>;
  setPhase: Dispatch<SetStateAction<GamePhase>>;
}

const Options = ({
  playerName,
  setPlayerName,
  setGameData,
  setPhase,
}: OptionsProps) => {
  const [selectedOperator, setSelectedOperator] = useState<Operator>(null);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("easy");
  const operators = [
    { value: "add", label: "Addition" },
    { value: "sub", label: "Subtraction" },
    { value: "mul", label: "Multiplication" },
    { value: "div", label: "Division" },
  ];

  const difficulties = [
    { value: "easy", label: "Easy" },
    { value: "hard", label: "Hard" },
  ];

  const onOperatorChange = (operator: Operator) => {
    setSelectedOperator(operator);
  };

  const onDifficultyChange = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleStart = () => {
    const generatedQuestions = generateQuestions(
      selectedOperator,
      selectedDifficulty
    );

    setGameData({
      playerName,
      datePlayed: new Date(),
      selectedDifficulty,
      selectedOperator,
      elapsedTime: null,
      questions: generatedQuestions,
      totalScore: 0,
      correctAnswersScore: 0,
      difficultyMultiplier: selectedDifficulty === "easy" ? 1 : 2,
      timeScore: 0,
    });

    setPhase(GamePhase.COUNTDOWN);
  };

  return (
    <div>
      <h2>Select Game Options</h2>
      <div className="flex items-center">
        <p className="text-lg">Who is Playing?</p>
        <Input onChange={(e) => setPlayerName(e.target.value)} />

        {/* <InputNameForm setPlayerName={setPlayerName} /> */}
        <p className="ml-2">
          {playerName === "" ? "" : `Hello ${playerName}!`}
        </p>
      </div>
      <div>
        <p>Select Operator:</p>
        <div className="flex">
          {operators.map((operator) => (
            <Button
              key={operator.value}
              className={`mr-2 ${
                selectedOperator === operator.value
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => onOperatorChange(operator.value as Operator)}
            >
              {operator.label}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <p>Select Difficulty:</p>
        <div className="flex">
          {difficulties.map((d) => (
            <Button
              key={d.value}
              className={`mr-2 ${
                selectedDifficulty === d.value
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => onDifficultyChange(d.value as Difficulty)}
            >
              {d.label}
            </Button>
          ))}
        </div>
      </div>
      <Button
        onClick={handleStart}
        disabled={!selectedOperator || !selectedDifficulty || playerName === ""}
      >
        Start Game
      </Button>
    </div>
  );
};

export default Options;
