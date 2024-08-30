import { FaPlayCircle } from "react-icons/fa";
import { InteractiveIcon } from "./TimerContainer";
import { useAppSelector } from "../../hooks";
import { calculateHours, calculateMinutes } from "../../utils/utilities";
import type { SettingsProps } from "../../reducers/settingsReducer";

interface TimerProps {
  currentMode: string;
  startTimer: () => void;
}

const StaticTimer = ({ currentMode, startTimer }: TimerProps) => {
  const timeSelector = useAppSelector((state) => (state.settings[currentMode as keyof SettingsProps] as number) * 60);
  const hours = calculateHours(timeSelector);
  const minutes = calculateMinutes(timeSelector);

  const displayTimeString = () => `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00`;

  return (
    <>
      <span className="timer">{displayTimeString()}</span>
      <InteractiveIcon>
        <FaPlayCircle size="3.5rem" onClick={startTimer} />
      </InteractiveIcon>
    </>
  );
};

export default StaticTimer;
