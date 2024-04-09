import { useRef, useState } from "react";
import styled from "styled-components";
import { FaPlayCircle, FaUndoAlt } from "react-icons/fa";
import Timer from "./Timer";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getNextMode, resetCycle, selectMode } from "../reducers/timerReducer";
import { playAudio } from "../utils/utilities";
import { MODE_TEXT, SFX } from "../utils/constants";
import type { TimeFormat } from "../reducers/timerReducer";

const TimerContainer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const intervalId = useRef<null | number>(null);
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

  const handleModeClick = (mode: string) => {
    if (isRunning) {
      clearInterval(intervalId.current as number);
      setIsRunning(false);
      document.title = "Palmodoro";
    }
    dispatch(selectMode(mode));
  };

  const handleReset = () => dispatch(resetCycle());

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
          intervalId={intervalId}
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
      <Session>
        <span>
          Session: {currentCycle} / {cycleThreshold}
        </span>
        <InteractiveIcon>
          <FaUndoAlt onClick={handleReset} />
        </InteractiveIcon>
      </Session>
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
  background: ${({ $isCurrentMode }) => ($isCurrentMode ? "#ed5b3a" : "#7b6d879e")};
  color: white;
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 100ms;
  cursor: pointer;
`;

const Session = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const InteractiveIcon = styled.span`
  line-height: 5px;
  cursor: pointer;
`;

export default TimerContainer;
