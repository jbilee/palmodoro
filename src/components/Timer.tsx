import { Dispatch, SetStateAction, useRef } from "react";
import styled from "styled-components";
import {
  calculateHours,
  calculateMinutes,
  calculateSeconds,
} from "../utils/utilities";

interface TimerProps {
  hour: number;
  minute: number;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
}

function Timer({ hour, minute, setIsRunning }: TimerProps) {
  const elem = useRef(null);
  let id: number | null = null;
  let timeLeft = hour * 3600 + minute * 60;

  const timerDone = () => {
    console.log("timerDone invoked");

    // setIsRunning(false);
    // alert("time's up!");
  };

  const stopTimer = () => {
    clearInterval(id as number);
    setIsRunning(false);
  };

  const getTime = (time: number) =>
    `${calculateHours(time).toString().padStart(2, "0")}:${calculateMinutes(
      time
    )
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
    <Wrapper>
      <div ref={elem} className="timer">
        {getTime(timeLeft)}
      </div>
      <div>
        <button onClick={() => stopTimer()}>Stop</button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-size: 4rem;
`;

export default Timer;
