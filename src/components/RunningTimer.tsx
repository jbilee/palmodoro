import { memo, useRef } from "react";
import { FaStopCircle } from "react-icons/fa";
import { useAppSelector } from "../hooks";
import { InteractiveIcon } from "./TimerContainer";
import { calculateHours, calculateMinutes, calculateSeconds } from "../utils/utilities";

interface TimerProps {
  currentMode: string;
  setIntervalId: (id: number) => void;
  changeMode: () => void;
  stopTimer: () => void;
}

const RunningTimer = memo(function RunningTimer({
  currentMode,
  setIntervalId,
  changeMode,
  stopTimer,
}: TimerProps) {
  const elem = useRef(null);
  const currentInterval = useRef<null | number>(null);
  const timeSelector = useAppSelector(
    (state) => state.settings[currentMode as keyof typeof state.settings] as number
  );
  let timeLeft = timeSelector * 60;

  if (currentInterval.current) clearInterval(currentInterval.current);

  const getTime = (time: number) => {
    return `${calculateHours(time).toString().padStart(2, "0")}:${calculateMinutes(time)
      .toString()
      .padStart(2, "0")}:${calculateSeconds(time).toString().padStart(2, "0")}`;
  };

  const updateTime = () => {
    if (!elem.current) return;
    (elem.current as HTMLElement).innerText = getTime(timeLeft);
    document.title = getTime(timeLeft) + " | Palmodoro";
  };

  const startTimer = () => {
    currentInterval.current = setInterval(() => {
      if (timeLeft === 0) {
        timeLeft -= 1;
        clearInterval(currentInterval.current as number);
        return changeMode();
      }
      timeLeft -= 1;
      updateTime();
    }, 1000);
    setIntervalId(currentInterval.current);
  };

  startTimer();
  updateTime();

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
});

export default RunningTimer;
