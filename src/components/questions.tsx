import {
  useState,
  useEffect,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import { operatorMap } from "../utils";
import { useSpring, animated } from "react-spring";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { type Question, type GameData, GamePhase } from "../types";
import { api } from "../utils/api";
import { NUMBER_OF_QUESTIONS } from "../constants";

interface QuestionsProps {
  gameData: GameData;
  setGameData: Dispatch<SetStateAction<GameData>>;
  setPhase: Dispatch<SetStateAction<GamePhase>>;
}

const Questions = ({ gameData, setGameData, setPhase }: QuestionsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const createGame = api.game.createGame.useMutation();
  const [showCorrect, setShowCorrect] = useState(false);
  const [createdGame, setCreatedGame] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const [showWrong, setShowWrong] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [tempUserAnswers, setTempUserAnswers] = useState<Question[]>(
    [] as Question[]
  );
  const [inputDisabled, setInputDisabled] = useState(false);

  const correctAnimation = useSpring({
    opacity: showCorrect ? 1 : 0,
    transform: showCorrect ? "scale(5)" : "scale(0)",
  });

  const wrongAnimation = useSpring({
    opacity: showWrong ? 1 : 0,
    transform: showWrong ? "scale(5)" : "scale(0)",
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputDisabled(false);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  }, [currentIndex]);

  useEffect(() => {
    const questions = gameData.questions;
    if (questions) {
      setTempUserAnswers(questions);
    }
  }, [gameData.questions]);

  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      setTimer((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (currentIndex === NUMBER_OF_QUESTIONS) {
      setShowTimer(false);
      const timeWeight = NUMBER_OF_QUESTIONS * 5;
      gameData.timeScore =
        gameData.elapsedTime > timeWeight
          ? 0
          : timeWeight - gameData.elapsedTime;
      gameData.totalScore =
        gameData.timeScore +
        gameData.correctAnswersScore * gameData.difficultyMultiplier;

      const {
        selectedDifficulty,
        selectedOperator,
        totalScore,
        playerName,
        elapsedTime,
      } = gameData;
      if (!createdGame) {
        createGame.mutate({
          difficulty: selectedDifficulty,
          score: totalScore,
          gameMode: selectedOperator as string,
          playerName: playerName,
          time: elapsedTime,
        });
        setCreatedGame(true);
      }

      setTimeout(() => {
        setPhase(GamePhase.END_GAME);
      }, 2000);
    }
  }, [
    gameData,
    currentIndex,
    setPhase,
    tempUserAnswers,
    createGame,
    createdGame,
  ]);

  if (!gameData.questions) {
    return <p>Loading...</p>;
  }

  const handleNextQuestion = () => {
    setInputDisabled(true);

    const oldQuestions: Question[] = tempUserAnswers;
    oldQuestions[currentIndex]!.userAnswer = parseInt(userAnswer);
    setTempUserAnswers(oldQuestions);

    const currentScore = gameData.correctAnswersScore;

    const correct =
      gameData.questions[currentIndex]!.correctAnswer.toString() === userAnswer;

    const newScore = correct ? currentScore + 10 : currentScore;

    setGameData({
      ...gameData,
      questions: tempUserAnswers,
      elapsedTime: timer,
      correctAnswersScore: newScore,
    });

    if (correct) {
      setShowCorrect(true);
    } else {
      setShowWrong(true);
    }

    // Reset the animation after a certain delay
    setTimeout(() => {
      setShowCorrect(false);
      setShowWrong(false);
    }, 1000);
    setUserAnswer("");
    setCurrentIndex(currentIndex + 1);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && userAnswer) {
      handleNextQuestion();
    }
  };

  const { questions, selectedOperator } = gameData;
  if (!gameData.questions) {
    return <p>Loading questions...</p>;
  }

  if (currentIndex === NUMBER_OF_QUESTIONS) {
    return (
      <div className="">
        <p className=" w-full text-center text-6xl">Game over!</p>;
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center md:h-auto ">
      {showTimer && <p className="my-4 text-2xl">Time: {timer}</p>}
      <div className="flex flex-col items-center justify-center md:flex-row">
        <h2 className="mb-4 text-5xl md:mr-8 ">Question {currentIndex + 1}:</h2>
        <div className="mb-4 flex items-center justify-center ">
          <p className="mr-4 text-5xl font-bold">
            {questions[currentIndex]!.x}
          </p>
          <p className="mr-4 text-5xl font-bold">
            {operatorMap(selectedOperator)}
          </p>
          <p className="mr-4 text-5xl font-bold">
            {questions[currentIndex]!.y}
          </p>
          <p className="mr-4 text-5xl font-bold">=</p>
          <input
            ref={inputRef}
            disabled={inputDisabled}
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyUp={handleKeyPress}
            className="h-24 w-24 rounded-lg bg-gray-200 px-4 py-2 text-3xl"
          />
          <div className="ml-16 flex items-center">
            <animated.div style={correctAnimation}>
              <FaThumbsUp className="text-2xl text-green-600" />
            </animated.div>
            <animated.div style={wrongAnimation}>
              <FaThumbsDown className="text-2xl text-red-600" />
            </animated.div>
          </div>
        </div>
      </div>

      <button
        onClick={handleNextQuestion}
        disabled={!userAnswer}
        className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white"
      >
        Next
      </button>
    </div>
  );
};

export default Questions;
