import { useState } from "react";
import styled from "styled-components";
import { FaPlayCircle } from "react-icons/fa";
import Timer from "./Timer";
import { useAppDispatch, useAppSelector } from "../hooks";
import { TimeFormat } from "../reducers/timerReducer";
import { MODE_TEXT } from "../utils/constants";

const TimerContainer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const currentMode = useAppSelector((state) => state.timer.currentMode);
  const currentTime = useAppSelector(
    (state) => state.timer[currentMode as keyof typeof state.timer] as TimeFormat
  );
  const dispatch = useAppDispatch();

  const startTimer = () => {
    setIsRunning(true);
  };

  const displayTimeString = () => {
    return `${currentTime.hours.toString().padStart(2, "0")}:${currentTime.minutes
      .toString()
      .padStart(2, "0")}:00`;
  };

  const changeMode = () => {
    switch (currentMode) {
      case "pomodoro": {
        return dispatch({ type: "timer/changeMode", payload: "shortBreak" });
      }
      case "shortBreak": {
        return dispatch({ type: "timer/changeMode", payload: "longBreak" });
      }
      case "longBreak": {
        return dispatch({ type: "timer/changeMode", payload: "pomodoro" });
      }
    }
  };

  return (
    <Wrapper>
      <Header>
        {Object.keys(MODE_TEXT).map((mode) => (
          <Mode $isCurrentMode={currentMode === mode}>
            {MODE_TEXT[mode as keyof typeof MODE_TEXT]}
          </Mode>
        ))}
      </Header>
      {isRunning ? (
        <Timer
          hour={currentTime.hours}
          minute={currentTime.minutes}
          setIsRunning={setIsRunning}
          changeMode={changeMode}
        />
      ) : (
        <>
          <span className="timer">{displayTimeString()}</span>
          <InteractiveIcon>
            <FaPlayCircle size="3.5rem" onClick={startTimer} />
          </InteractiveIcon>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Header = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
`;

const Mode = styled.div<{ $isCurrentMode: boolean }>`
  border-radius: 6px;
  background: ${({ $isCurrentMode }) => ($isCurrentMode ? "black" : "blue")};
  color: white;
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 500ms;
`;

export const InteractiveIcon = styled.span`
  cursor: pointer;
`;

export default TimerContainer;
