import { useState, type Dispatch, type SetStateAction } from "react";
import { defaultGame } from "../constants";
import { GamePhase, type GameData } from "../types";
import { createNewGame } from "../utils";
import Countdown from "./countdown";
import EndGame from "./endGame";
import Options from "./options";
import Questions from "./questions";
import Leaderboard from "./scoreboard";
import { Button } from "./ui/button";

interface MathGameProps {
  playerName: string;
  setPlayerName: Dispatch<SetStateAction<string>>;
}

const MathGame = ({ playerName, setPlayerName }: MathGameProps) => {
  const [phase, setPhase] = useState<GamePhase>(GamePhase.HOME);
  const [gameData, setGameData] = useState<GameData>(defaultGame);

  const onTryAgain = () => {
    const newGame = createNewGame(gameData);
    setGameData(newGame);
    setPhase(GamePhase.COUNTDOWN);
  };

  const onNewGame = () => {
    const newGame = createNewGame(gameData);
    setGameData(newGame);
    setPhase(GamePhase.OPTIONS);
  };

  const renderComponent = () => {
    switch (phase) {
      case GamePhase.HOME:
        return (
          <div className="flex flex-col">
            <Button
              className="mb-4"
              onClick={() => setPhase(GamePhase.OPTIONS)}
            >
              Start New Game
            </Button>
            <Leaderboard />
          </div>
        );
      case GamePhase.OPTIONS:
        return (
          <Options
            setGameData={setGameData}
            playerName={playerName}
            setPlayerName={setPlayerName}
            setPhase={setPhase}
            defaults={{
              playerName,
              selectedDifficulty: gameData.selectedDifficulty,
              selectedOperator: gameData.selectedOperator,
            }}
          />
        );
      case GamePhase.COUNTDOWN:
        return <Countdown setPhase={setPhase} />;
      case GamePhase.QUESTIONS:
        return (
          <Questions
            gameData={gameData}
            setGameData={setGameData}
            setPhase={setPhase}
          />
        );
      case GamePhase.END_GAME:
        return (
          <EndGame
            gameData={gameData}
            onTryAgain={onTryAgain}
            onNewGame={onNewGame}
          />
        );
      default:
        return null;
    }
  };

  return <div>{renderComponent()}</div>;
};

export default MathGame;
