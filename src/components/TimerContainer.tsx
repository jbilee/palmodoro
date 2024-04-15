import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaUndoAlt } from "react-icons/fa";
import RunningTimer from "./RunningTimer";
import StaticTimer from "./StaticTimer";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getNextMode, resetCycle, selectMode } from "../reducers/timerReducer";
import { playAudio } from "../utils/utilities";
import { MODE_TEXT } from "../utils/constants";

const TimerContainer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const intervalId = useRef<null | number>(null);
  const currentMode = useAppSelector((state) => state.timer.currentMode);
  const currentCycle = useAppSelector((state) => state.timer.currentCycle);
  const cycleThreshold = useAppSelector((state) => state.timer.cycleThreshold);
  const timerSound = useAppSelector((state) => state.settings.sound.url);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isRunning) playAudio(timerSound);
  }, [currentMode]);

  const setIntervalId = useCallback(
    (id: number) => {
      intervalId.current = id;
    },
    [intervalId]
  );

  const startTimer = () => {
    setIsRunning(true);
  };

  const changeMode = useCallback(() => {
    dispatch(getNextMode());
  }, [dispatch]);

  const stopTimer = useCallback(() => {
    clearInterval(intervalId.current as number);
    document.title = "Palmodoro";
    setIsRunning(false);
  }, [intervalId, setIsRunning]);

  const handleModeClick = (mode: string) => {
    if (isRunning) {
      clearInterval(intervalId.current as number);
      setIsRunning(false);
      document.title = "Palmodoro";
    }
    dispatch(selectMode(mode));
  };

  const handleReset = () => dispatch(resetCycle());

  return (
    <Wrapper>
      <Header>
        {Object.keys(MODE_TEXT).map((mode) => (
          <Mode $isCurrentMode={currentMode === mode} key={mode} onClick={() => handleModeClick(mode)}>
            {MODE_TEXT[mode as keyof typeof MODE_TEXT]}
          </Mode>
        ))}
      </Header>
      {isRunning ? (
        <RunningTimer
          currentMode={currentMode}
          setIntervalId={setIntervalId}
          changeMode={changeMode}
          stopTimer={stopTimer}
        />
      ) : (
        <StaticTimer currentMode={currentMode} startTimer={startTimer} />
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
  gap: 15px;
  @media (min-width: 1200px) {
    padding-bottom: 10px;
  }
`;

const Header = styled.div`
  display: flex;
  gap: 8px;
  @media (min-width: 600px) {
    gap: 14px;
  }
`;

const Mode = styled.div<{ $isCurrentMode: boolean }>`
  border-radius: 6px;
  background: ${({ $isCurrentMode }) => ($isCurrentMode ? "#ed5b3a" : "#7b6d879e")};
  color: white;
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 130ms;
  cursor: pointer;
  @media (min-width: 600px) {
    width: 120px;
  }
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
