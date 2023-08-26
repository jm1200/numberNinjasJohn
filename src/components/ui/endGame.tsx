import { type GameData } from "../../types";
import { operatorMap } from "../../utils";
import { Button } from "./button";
import Scoreboard from "./scoreboard";

interface EndGameProps {
  onRestart: () => void;
  gameData: GameData;
}

const EndGame = ({ onRestart, gameData }: EndGameProps) => {
  // Placeholder score calculation based on time, number of questions answered correctly, and difficulty

  // let correctAnswersNum = 0;

  const {
    questions,
    selectedOperator,
    elapsedTime,
    correctAnswersScore,
    timeScore,
    totalScore,
    difficultyMultiplier,
  } = gameData;

  // for (const question of questions) {
  //   const c = question.correctAnswer;
  //   const u = question.userAnswer;
  //   if (c === u) {
  //     correctAnswersNum++;
  //   }
  // }

  if (!questions) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2 className="w-full text-center text-4xl ">Game Over</h2>
      <div className="flex">
        <div className="p-8">
          <h3 className="text-3xl">Questions:</h3>
          {questions.map((question, index) => (
            <div key={index} className="mb-2">
              <p>
                {question.x} {operatorMap(selectedOperator)} {question.y} ={" "}
                {question.userAnswer === question.correctAnswer ? (
                  <span className="text-green-500">{question.userAnswer}</span>
                ) : (
                  <>
                    <span className="text-red-500">{question.userAnswer}</span>{" "}
                    <span className="text-purple-500">
                      (Correct: {question.correctAnswer})
                    </span>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
        <div className="border-3 p-8">
          <p className="text-3xl">Your Score: {totalScore}</p>
          <p>Elapsed Time: {elapsedTime} seconds</p>
          <p>Time Bonus Score: {timeScore}</p>
          <p>Correct Answers Score: {correctAnswersScore}</p>
          <p>Difficulty Bonus Score: {difficultyMultiplier}</p>
        </div>
      </div>
      <div className="w-full text-center">
        <Button className="mr-2" onClick={onRestart}>
          Restart Game
        </Button>
        <Button onClick={() => window.location.reload()}>New Game</Button>
      </div>
      <div className="mt-4">
        <Scoreboard />
      </div>
    </div>
  );
};

export default EndGame;
