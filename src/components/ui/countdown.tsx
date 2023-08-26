import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import { GamePhase } from "../../types";

interface CountDownProps {
  setPhase: Dispatch<SetStateAction<GamePhase>>;
}

const Countdown = ({ setPhase }: CountDownProps) => {
  console.log("countdown.tsx 4 countdown:");
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

  return <h2>{count > 0 ? count : "Go!"}</h2>;
};

export default Countdown;
