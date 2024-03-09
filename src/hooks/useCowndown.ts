import { useEffect, useState } from "react";

export const useCowndown = (countDown: number, addResultOfUser) => {
  const [time, setTime] = useState(countDown);
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    if (time <= 0) {
      clearInterval(timer);
      console.log("Quiz timed out!");
    }

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (time === 0 && addResultOfUser) {
      addResultOfUser();
    }
  }, [time]);

  return time;
};
