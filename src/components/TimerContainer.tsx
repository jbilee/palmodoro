import { useRef, useState } from "react";
import styled from "styled-components";
import { FaPlayCircle, FaUndoAlt } from "react-icons/fa";
import Timer from "./Timer";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getNextMode, resetCycle, selectMode } from "../reducers/timerReducer";
import { calculateHours, calculateMinutes, playAudio } from "../utils/utilities";
import { MODE_TEXT } from "../utils/constants";
import type { SettingsProps } from "../reducers/settingsReducer";

const TimerContainer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const intervalId = useRef<null | number>(null);
  const currentMode = useAppSelector((state) => state.timer.currentMode);
  const currentTime = useAppSelector(
    (state) => (state.settings[currentMode as keyof SettingsProps] as number) * 60
  );
  const currentCycle = useAppSelector((state) => state.timer.currentCycle);
  const cycleThreshold = useAppSelector((state) => state.timer.cycleThreshold);
  const timerSound = useAppSelector((state) => state.settings.sound.url);
  const dispatch = useAppDispatch();

  const startTimer = () => {
    setIsRunning(true);
  };

  const displayTimeString = () => {
    const hours = calculateHours(currentTime);
    const minutes = calculateMinutes(currentTime);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00`;
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
    playAudio(timerSound);
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
          seconds={currentTime}
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
  transition: 130ms;
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
