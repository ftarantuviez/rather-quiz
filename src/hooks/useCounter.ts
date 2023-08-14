import { useEffect, useState } from "react";

const useCounter = (lifeTime: number, onH: any) => {
  const [counter, setCounter] = useState(lifeTime);

  useEffect(() => {
    const timer =
      counter > 0 &&
      setInterval(() => {
        if (counter - 1 === 0) onH();
        setCounter(counter - 1);
      }, 1000);
    return () => clearInterval(timer || "");
  }, [counter, onH]);

  useEffect(() => {
    setCounter(lifeTime);
  }, [lifeTime]);

  return counter;
};

export default useCounter;
