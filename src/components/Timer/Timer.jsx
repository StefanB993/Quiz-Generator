import { useEffect } from "react";
import { useState } from "react";

function Timer({ numQuestions, dispatch }) {
  const [time, setTime] = useState(numQuestions * 20);
  const min = Math.floor(time / 60);
  const sec = (time % 60).toString().padStart(2, "0");

  useEffect(() => {
    if (time === 0) {
      console.log("OK");
      dispatch({ type: "finish" });
      return;
    }
    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, dispatch]);

  return (
    <div>
      {min}:{sec}
    </div>
  );
}

export default Timer;
