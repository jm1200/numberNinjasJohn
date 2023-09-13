import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import { GamePhase } from "../types";

interface CountDownProps {
  setPhase: Dispatch<SetStateAction<GamePhase>>;
}

const Countdown = ({ setPhase }: CountDownProps) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const countdown = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    if (count === 0) {
      setPhase(GamePhase.QUESTIONS);
    }

    return () => {
      clearInterval(countdown);
    };
  }, [count, setPhase]);

  return (
    <div className="flex h-screen w-full items-center justify-center ">
      <h2 className="text-9xl">{count > 0 ? count : "Go!"}</h2>
    </div>
  );
};

export default Countdown;
