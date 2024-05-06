import { memo, useEffect, useRef } from "react";
import { FaStopCircle } from "react-icons/fa";
import { useAppSelector } from "../hooks";
import { InteractiveIcon } from "./TimerContainer";
import { calculateHours, calculateMinutes, calculateSeconds, isMobile } from "../utils/utilities";

interface TimerProps {
  currentMode: string;
  setIntervalId: (id: number) => void;
  changeMode: () => void;
  stopTimer: () => void;
}

const RunningTimer = memo(function RunningTimer({ currentMode, setIntervalId, changeMode, stopTimer }: TimerProps) {
  const elem = useRef(null);
  const currentInterval = useRef<null | number>(null);
  const timeSelector = useAppSelector((state) => state.settings[currentMode as keyof typeof state.settings] as number);
  const timeLeft = useRef(0);
  const isPaused = useRef(false);
  const pauseTime = useRef<null | number>(null);

  useEffect(() => {
    if (!isMobile()) return;

    const pauseTimer = () => {
      if (!currentInterval.current) return;
      pauseTime.current = Date.now();
      clearInterval(currentInterval.current);
      isPaused.current = true;
    };

    const resumeTimer = () => {
      const resumeTime = Date.now();
      timeLeft.current -= Math.round((resumeTime - pauseTime.current!) / 1000);
      updateTime(); // Immediately reflect time left on UI
      if (timeLeft.current <= 0) {
        isPaused.current = false;
        return changeMode();
      }
      isPaused.current = false;
      startTimer();
    };

    window.addEventListener("visibilitychange", () => {
      if (isPaused.current && pauseTime.current) resumeTimer();
      else pauseTimer();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (currentInterval.current) clearInterval(currentInterval.current);

  const getTime = (time: number) => {
    return `${calculateHours(time).toString().padStart(2, "0")}:${calculateMinutes(time)
      .toString()
      .padStart(2, "0")}:${calculateSeconds(time).toString().padStart(2, "0")}`;
  };

  const updateTime = () => {
    if (!elem.current) return;
    (elem.current as HTMLElement).innerText = getTime(timeLeft.current);
    document.title = getTime(timeLeft.current) + " | Palmodoro";
  };

  const startTimer = () => {
    timeLeft.current = timeSelector * 60;
    currentInterval.current = setInterval(() => {
      if (timeLeft.current === 0) {
        timeLeft.current -= 1;
        clearInterval(currentInterval.current as number);
        return changeMode();
      }
      timeLeft.current -= 1;
      updateTime();
    }, 1000);
    setIntervalId(currentInterval.current);
  };

  startTimer();
  updateTime();

  return (
    <>
      <span ref={elem} className="timer">
        {getTime(timeLeft.current)}
      </span>
      <InteractiveIcon>
        <FaStopCircle size="3.5rem" onClick={stopTimer} />
      </InteractiveIcon>
    </>
  );
});

export default RunningTimer;
