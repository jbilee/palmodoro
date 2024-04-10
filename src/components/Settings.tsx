import { useRef } from "react";
import styled from "styled-components";
import { RiSettings5Fill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../hooks";
import { saveSound, saveTime } from "../reducers/settingsReducer";
import { playAudio } from "../utils/utilities";
import { SFX } from "../utils/constants";
import type { ChangeEvent } from "react";

const Settings = () => {
  const dispatch = useAppDispatch();
  const box = useRef<null | HTMLDivElement>(null);
  const selection = useRef<null | HTMLSelectElement>(null);
  const timerSound = useAppSelector((state) => state.settings.sound.legend);
  const pomodoroTime = useAppSelector((state) => state.settings.pomodoro);
  const shortBreakTime = useAppSelector((state) => state.settings.shortBreak);
  const longBreakTime = useAppSelector((state) => state.settings.longBreak);
  const cycleThreshold = useAppSelector((state) => state.timer.cycleThreshold);

  const handleClick = () => {
    if (!box.current) return;
    const boxElem = box.current as HTMLDivElement;
    boxElem.classList.toggle("hidden");
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    let time = Number(e.target.value);
    if (time < Number(e.target.min)) time = Number(e.target.min);
    if (time > Number(e.target.max)) time = Number(e.target.max);
    const mode = e.target.id;
    dispatch(saveTime({ time, mode }));
    e.target.value = time.toString();
  };

  const handleSoundSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const legend = e.target.value;
    dispatch(saveSound(legend));
  };

  const playSound = () => {
    if (!selection.current) return;
    const legend = selection.current.value;
    const audio = SFX.find((obj) => obj.legend === legend) as { legend: string; url: string };
    playAudio(audio.url);
  };

  return (
    <Wrapper>
      <Tab>
        <RiSettings5Fill size="2rem" onClick={handleClick} />
      </Tab>
      <Box ref={box}>
        <Content>
          <div className="heading-large">Settings</div>
          <div className="heading-small">Timer</div>
          <div>
            Pomodoro:
            <input
              id="pomodoro"
              type="number"
              min="1"
              max="180"
              defaultValue={pomodoroTime}
              onChange={handleTimeChange}
            />{" "}
            Minutes
          </div>
          <div>
            Short Break:
            <input
              id="shortBreak"
              type="number"
              min="1"
              max="30"
              defaultValue={shortBreakTime}
              onChange={handleTimeChange}
            />{" "}
            Minutes
          </div>
          <div>
            Long Break:
            <input
              id="longBreak"
              type="number"
              min="1"
              max="30"
              defaultValue={longBreakTime}
              onChange={handleTimeChange}
            />{" "}
            Minutes
          </div>
          <div className="heading-small">Cycles</div>
          {cycleThreshold}
          <div className="heading-small">Sound</div>
          <select ref={selection} defaultValue={timerSound} onChange={handleSoundSelect}>
            {SFX.map((sound, i) => (
              <option key={i}>{sound.legend}</option>
            ))}
          </select>
          <button onClick={playSound}>Listen</button>
          <div className="heading-small">Wallpaper</div>
        </Content>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  z-index: 10;
  right: 0;
  display: flex;
  height: 100%;
  .hidden {
    margin-right: -350px;
  }
`;

const Tab = styled.div`
  margin-top: 15px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  display: grid;
  place-content: center center;
  padding: 0 12px;
  max-height: 60px;
  background: #130d1dd2;
  cursor: pointer;
`;

const Box = styled.div`
  width: 350px;
  background: #130d1dd2;
  transition: 300ms;
`;

const Content = styled.div`
  padding: 24px 32px;
  & h2 {
    text-align: center;
  }
`;

export default Settings;
