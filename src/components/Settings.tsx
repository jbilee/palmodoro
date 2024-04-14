import { useRef, type ChangeEvent } from "react";
import { Button, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import styled from "styled-components";
import { MdLightbulb } from "react-icons/md";
import { RiSettings5Fill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../hooks";
import { saveSound, saveTime } from "../reducers/settingsReducer";
import { changeThreshold } from "../reducers/timerReducer";
import { randomizeWallpaper, uploadWallpaper } from "../reducers/wallpaperReducer";
import NumberInput from "./NumberInput";
import { playAudio } from "../utils/utilities";
import { SFX } from "../utils/constants";

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

  const handleThresholdChange = (e: ChangeEvent<HTMLInputElement>) => {
    let cycle = Number(e.target.value);
    if (cycle < Number(e.target.min)) cycle = Number(e.target.min);
    if (cycle > Number(e.target.max)) cycle = Number(e.target.max);
    dispatch(changeThreshold(cycle));
    e.target.value = cycle.toString();
  };

  const handleSoundSelect = (e: SelectChangeEvent<string>) => {
    const legend = e.target.value;
    dispatch(saveSound(legend));
  };

  const handleRandomize = () => dispatch(randomizeWallpaper());

  const playSound = () => {
    if (!selection.current) return;
    const legend = selection.current.value;
    const audio = SFX.find((obj) => obj.legend === legend) as { legend: string; url: string };
    playAudio(audio.url);
  };

  const handleFile = (files: FileList) => {
    const imageFile = files?.[0];
    if (imageFile && imageFile.type.includes("image")) {
      const url = URL.createObjectURL(imageFile);
      dispatch(uploadWallpaper(url));
    }
  };

  return (
    <Wrapper>
      <Tab>
        <RiSettings5Fill onClick={handleClick} />
      </Tab>
      <Box ref={box} className="hidden">
        <Content>
          <div className="heading-large">Settings</div>
          <div className="heading-small">Timer</div>
          <Options>
            <Row>
              Pomodoro:
              <NumberInput
                id="pomodoro"
                type="number"
                min="1"
                max="180"
                defaultValue={pomodoroTime}
                onChange={handleTimeChange}
              />
              Minutes
            </Row>
            <Row>
              Short Break:
              <NumberInput
                id="shortBreak"
                type="number"
                min="1"
                max="30"
                defaultValue={shortBreakTime}
                onChange={handleTimeChange}
              />
              Minutes
            </Row>
            <Row>
              Long Break:
              <NumberInput
                id="longBreak"
                type="number"
                min="1"
                max="30"
                defaultValue={longBreakTime}
                onChange={handleTimeChange}
              />
              Minutes
            </Row>
          </Options>
          <div className="heading-small">Cycle</div>
          <Options>
            <Row>
              <NumberInput
                id="threshold"
                type="number"
                min="1"
                max="30"
                defaultValue={cycleThreshold}
                onChange={handleThresholdChange}
              />
              Pomodoros per cycle
            </Row>
          </Options>
          <div className="heading-small">Sound</div>
          <Options>
            <Row>
              <Select
                inputRef={selection}
                value={timerSound}
                onChange={handleSoundSelect}
                size="small"
                sx={{
                  background: "white",
                }}
              >
                {SFX.map((sound, i) => (
                  <MenuItem key={i} value={sound.legend}>
                    {sound.legend}
                  </MenuItem>
                ))}
              </Select>
              <Button variant="contained" onClick={playSound} disableElevation>
                Listen
              </Button>
            </Row>
          </Options>
          <div className="heading-small">Wallpaper</div>
          <Options>
            <Row>
              <Button variant="contained" onClick={handleRandomize} disableElevation>
                Random Image
              </Button>
            </Row>
            <label htmlFor="file">
              <DragNDrop
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files) handleFile(e.dataTransfer.files);
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                Click or drop your own image
              </DragNDrop>
            </label>
            <input
              id="file"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const files = e.target.files;
                if (!files) return;
                handleFile(files);
              }}
            />
            <MdLightbulb color="white" /> Press the F11 key to use the app in fullscreen mode!
          </Options>
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
    margin-right: -330px;
  }
`;

const Tab = styled.div`
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  display: grid;
  place-content: center center;
  padding: 0 12px;
  max-height: 46px;
  background: #130d1dd2;
  font-size: 1.7rem;
  cursor: pointer;
  @media (min-width: 600px) {
    margin-top: 15px;
    font-size: 2rem;
    max-height: 60px;
  }
`;

const Box = styled.div`
  width: 330px;
  background: #130d1dd2;
  transition: 300ms;
  overflow-y: auto;
`;

const Content = styled.div`
  padding: 24px 28px;
  & h2 {
    text-align: center;
  }
  & input[type="file"] {
    display: none;
  }
`;

const Options = styled.div`
  padding: 0 12px;
  margin-bottom: 24px;
  &:last-child {
    margin: 0;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
`;

const DragNDrop = styled.div`
  border: 1px dashed #b5442b;
  border-radius: 6px;
  background: #f88f75;
  color: white;
  display: grid;
  place-content: center center;
  min-height: 50px;
  user-select: none;
  cursor: pointer;
  &:hover {
    background: #ed5b3a;
  }
  margin-bottom: 14px;
`;

export default Settings;
