import { useRef } from "react";
import { FaStopCircle } from "react-icons/fa";
import { InteractiveIcon } from "./TimerContainer";
import { calculateHours, calculateMinutes, calculateSeconds } from "../utils/utilities";
import type { Dispatch, MutableRefObject, SetStateAction } from "react";

interface TimerProps {
  seconds: number;
  intervalId: MutableRefObject<number | null>;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
  changeMode: () => void;
}

function Timer({ seconds, intervalId, setIsRunning, changeMode }: TimerProps) {
  const elem = useRef(null);
  let timeLeft = seconds;

  const stopTimer = () => {
    clearInterval(intervalId.current as number);
    document.title = "Palmodoro";
    setIsRunning(false);
  };

  const getTime = (time: number) =>
    `${calculateHours(time).toString().padStart(2, "0")}:${calculateMinutes(time)
      .toString()
      .padStart(2, "0")}:${calculateSeconds(time).toString().padStart(2, "0")}`;

  const updateTime = () => {
    if (!elem.current) return;
    (elem.current as HTMLElement).innerText = getTime(timeLeft);
    document.title = getTime(timeLeft) + " | Palmodoro";
  };

  const startTimer = () => {
    intervalId.current = setInterval(() => {
      if (timeLeft === 1) {
        timeLeft -= 1;
        updateTime();
        clearInterval(intervalId.current as number);
        return changeMode();
      }
      timeLeft -= 1;
      updateTime();
    }, 1000);
  };

  startTimer();

  return (
    <>
      <span ref={elem} className="timer">
        {getTime(timeLeft)}
      </span>
      <InteractiveIcon>
        <FaStopCircle size="3.5rem" onClick={stopTimer} />
      </InteractiveIcon>
    </>
  );
}

export default Timer;
