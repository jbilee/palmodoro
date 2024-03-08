import { useState } from "react";
import Timer from "./Timer";

const TimerContainer = () => {
  const [isRunning, setIsRunning] = useState(false);
  
  const startTimer = () => {
    setIsRunning(true);
  };

  return <div id="timer-container">
  {isRunning ? (
    <Timer
      hour={0}
      minute={2}
      setIsRunning={setIsRunning}
    />
  ) : (
    <>00:01<button onClick={startTimer}>Start</button></>
  )}
</div>
}

export default TimerContainer