import { type Dispatch, type SetStateAction, useState } from "react";
import { Button } from "./ui/button";
import {
  type Difficulty,
  type GameData,
  GamePhase,
  type Operator,
} from "../types";
import { generateQuestions } from "../utils";
import { Input } from "./ui/input";
import { difficulties, operators } from "../constants";

interface OptionsProps {
  playerName: string;
  setPlayerName: Dispatch<SetStateAction<string>>;
  setGameData: Dispatch<SetStateAction<GameData>>;
  setPhase: Dispatch<SetStateAction<GamePhase>>;
  defaults: {
    selectedOperator: Operator;
    selectedDifficulty: Difficulty;
    playerName: string;
  };
}

const Options = ({
  playerName,
  setPlayerName,
  setGameData,
  setPhase,
  defaults,
}: OptionsProps) => {
  const [selectedOperator, setSelectedOperator] = useState<Operator>(
    defaults.selectedOperator
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(
    defaults.selectedDifficulty
  );

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
      elapsedTime: 0,
      questions: generatedQuestions,
      totalScore: 0,
      correctAnswersScore: 0,
      difficultyMultiplier: selectedDifficulty === "easy" ? 1 : 2,
      timeScore: 0,
    });

    setPhase(GamePhase.COUNTDOWN);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-4 w-full text-center text-2xl">Select Game Options</h2>
      <div className="m-auto flex flex-col md:flex-row">
        <div className="mr-8 flex flex-col items-center">
          <p className="mb-2 text-lg">Who is Playing?</p>
          <Input
            onChange={(e) => setPlayerName(e.target.value)}
            value={playerName}
          />
          <p className="m-2">
            {playerName === "" ? "" : `Hello ${playerName}!`}
          </p>
        </div>
        <div className="flex flex-col">
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
        </div>
      </div>

      <Button
        className="mt-4 w-1/2"
        onClick={handleStart}
        disabled={!selectedOperator || !selectedDifficulty || playerName === ""}
      >
        Start Game
      </Button>
    </div>
  );
};

export default Options;
