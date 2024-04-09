import { useState } from "react";
import styled from "styled-components";
import { FaPlayCircle } from "react-icons/fa";
import Timer from "./Timer";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getNextMode, selectMode } from "../reducers/timerReducer";
import { playAudio } from "../utils/utilities";
import { MODE_TEXT, SFX } from "../utils/constants";
import type { TimeFormat } from "../reducers/timerReducer";

const TimerContainer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const currentMode = useAppSelector((state) => state.timer.currentMode);
  const currentTime = useAppSelector(
    (state) => state.timer[currentMode as keyof typeof state.timer] as TimeFormat
  );
  const currentCycle = useAppSelector((state) => state.timer.currentCycle);
  const cycleThreshold = useAppSelector((state) => state.timer.cycleThreshold);
  const dispatch = useAppDispatch();

  const startTimer = () => {
    setIsRunning(true);
  };

  const displayTimeString = () => {
    return `${currentTime.hours.toString().padStart(2, "0")}:${currentTime.minutes
      .toString()
      .padStart(2, "0")}:00`;
  };

  const handleModeClick = (mode: string) => dispatch(selectMode(mode));

  const changeMode = () => {
    dispatch(getNextMode());
    playAudio(SFX[0].url);
  };

  return (
    <Wrapper>
      <Header>
        {Object.keys(MODE_TEXT).map((mode) => (
          <Mode
            $isCurrentMode={currentMode === mode}
            key={mode}
            onClick={() => handleModeClick(mode)}
          >
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
      {currentCycle} / {cycleThreshold}
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
  transition: 100ms;
  cursor: pointer;
`;

export const InteractiveIcon = styled.span`
  cursor: pointer;
`;

export default TimerContainer;
