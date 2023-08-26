import { useState, type Dispatch, type SetStateAction } from "react";
import Countdown from "./countdown";
import EndGame from "./endGame";
import Options from "./options";
import Questions from "./questions";
import { GamePhase, type GameData } from "../../types";
import { generateQuestions } from "../../utils";
import Leaderboard from "./scoreboard";
import { Button } from "./button";

interface MathGameProps {
  playerName: string;
  setPlayerName: Dispatch<SetStateAction<string>>;
}

const MathGame = ({ playerName, setPlayerName }: MathGameProps) => {
  const [phase, setPhase] = useState<GamePhase>(GamePhase.OPTIONS);

  // const [questions, setQuestions] = useState<QuestionsData | null>(null);
  // const [userAnswers, setUserAnswers] = useState<QuestionsData | null>(null);
  // const [score, setScore] = useState(0);
  // const [elapsedTime, setElapsedTime] = useState(0);
  const defaultGame: GameData = {
    playerName,
    datePlayed: new Date(),
    questions: null,
    elapsedTime: null,
    selectedDifficulty: null,
    selectedOperator: null,
    totalScore: 0,
    correctAnswersScore: 0,
    difficultyMultiplier: 1,
    timeScore: 0,
  };
  const [gameData, setGameData] = useState<GameData>(defaultGame);

  const restartGame = () => {
    console.log("mathgame.tsx 36 gameData:", gameData);
    const { selectedDifficulty, selectedOperator } = gameData;
    const newGame = {
      ...defaultGame,
      selectedDifficulty,
      selectedOperator,
      questions: generateQuestions(selectedOperator, selectedDifficulty!),
    };

    console.log("mathgame.tsx 43 newGame:", newGame);
    setGameData(newGame);
    setPhase(GamePhase.COUNTDOWN);
  };

  // useEffect(() => {
  //   if (phase === GamePhase.COUNTDOWN) {
  //     // Generate the questions when the phase transitions to COUNTDOWN
  //     const generatedQuestions = generateQuestions(
  //       gameData.selectedOperator,
  //       gameData.selectedDifficulty!
  //     );
  //     console.log("mathgame.tsx 64 generatedQuestions:", generatedQuestions);
  //     setGameData({ ...gameData, questions: generatedQuestions });

  //     // Transition to the QUESTIONS phase after a delay
  //     setTimeout(() => {
  //       setPhase(GamePhase.QUESTIONS);
  //     }, 3000); // 3-second countdown
  //   }
  // }, [phase, gameData]);

  // useEffect(() => {
  //   let interval: NodeJS.Timeout;

  //   if (phase === GamePhase.QUESTIONS) {
  //     interval = setInterval(() => {
  //       setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
  //     }, 1000);
  //   }

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [phase]);

  const renderComponent = () => {
    switch (phase) {
      case GamePhase.HOME:
        return (
          <div>
            <Leaderboard />
            <Button onClick={() => setPhase(GamePhase.OPTIONS)}>
              Start New Game
            </Button>
          </div>
        );
      case GamePhase.OPTIONS:
        return (
          <Options
            setGameData={setGameData}
            playerName={playerName}
            setPlayerName={setPlayerName}
            setPhase={setPhase}
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
        return <EndGame gameData={gameData} onRestart={restartGame} />;
      default:
        return null;
    }
  };

  return <div>{renderComponent()}</div>;
};

export default MathGame;
