import { useRef } from "react";
import { FaStopCircle } from "react-icons/fa";
import { InteractiveIcon } from "./TimerContainer";
import { calculateHours, calculateMinutes, calculateSeconds } from "../utils/utilities";
import type { Dispatch, SetStateAction } from "react";

interface TimerProps {
  hour: number;
  minute: number;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
  changeMode: () => void;
}

function Timer({ hour, minute, setIsRunning, changeMode }: TimerProps) {
  const elem = useRef(null);
  let id: number | null = null;
  let timeLeft = hour * 3600 + minute * 60;

  const timerDone = () => {
    console.log("timerDone invoked");
    changeMode();
  };

  const stopTimer = () => {
    clearInterval(id as number);
    setIsRunning(false);
  };

  const getTime = (time: number) =>
    `${calculateHours(time).toString().padStart(2, "0")}:${calculateMinutes(time)
      .toString()
      .padStart(2, "0")}:${calculateSeconds(time).toString().padStart(2, "0")}`;

  const updateTime = () => {
    if (!elem.current) return;
    (elem.current as HTMLElement).innerText = getTime(timeLeft);
  };

  const startTimer = () => {
    id = setInterval(() => {
      if (timeLeft === 1) {
        timeLeft -= 1;
        updateTime();
        clearInterval(id as number);
        return timerDone();
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
