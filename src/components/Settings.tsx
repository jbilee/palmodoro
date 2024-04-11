import { useRef, type ChangeEvent } from "react";
import { Button, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import styled from "styled-components";
import { MdLightbulb } from "react-icons/md";
import { RiSettings5Fill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../hooks";
import { saveSound, saveTime } from "../reducers/settingsReducer";
import { changeThreshold } from "../reducers/timerReducer";
import { randomizeWallpaper, uploadWallpaper } from "../reducers/wallpaperReducer";
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
    const newThreshold = Number(e.target.value);
    dispatch(changeThreshold(newThreshold));
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
        <RiSettings5Fill size="2rem" onClick={handleClick} />
      </Tab>
      <Box ref={box} className="hidden">
        <Content>
          <div className="heading-large">Settings</div>
          <div className="heading-small">Timer</div>
          <Options>
            <Row>
              Pomodoro:
              <NumberInput>
                <input
                  id="pomodoro"
                  type="number"
                  min="1"
                  max="180"
                  defaultValue={pomodoroTime}
                  onChange={handleTimeChange}
                />
              </NumberInput>{" "}
              Minutes
            </Row>
            <Row>
              Short Break:
              <NumberInput>
                <input
                  id="shortBreak"
                  type="number"
                  min="1"
                  max="30"
                  defaultValue={shortBreakTime}
                  onChange={handleTimeChange}
                />
              </NumberInput>{" "}
              Minutes
            </Row>
            <Row>
              Long Break:
              <NumberInput>
                <input
                  id="longBreak"
                  type="number"
                  min="1"
                  max="30"
                  defaultValue={longBreakTime}
                  onChange={handleTimeChange}
                />
              </NumberInput>{" "}
              Minutes
            </Row>
          </Options>
          <div className="heading-small">Cycle</div>
          <Options>
            <Row>
              <NumberInput>
                <input
                  id="threshold"
                  type="number"
                  min="2"
                  max="30"
                  defaultValue={cycleThreshold}
                  onChange={handleThresholdChange}
                />
              </NumberInput>
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
              <Button variant="contained" onClick={playSound}>
                Listen
              </Button>
            </Row>
          </Options>
          <div className="heading-small">Wallpaper</div>
          <Options>
            <Row>
              <Button variant="contained" onClick={handleRandomize}>
                Randomize
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
                Click or drop your image
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

const NumberInput = styled.div`
  background: white;
  padding: 10px 8px;
  border-radius: 4px;
  max-width: 70px;
  & > input {
    border: none;
    padding: 0;
    width: 100%;
    font-size: 0.9rem;
    text-align: center;
  }
`;

const DragNDrop = styled.div`
  border: 1px dashed blue;
  border-radius: 6px;
  background: #8a77b576;
  color: white;
  display: grid;
  place-content: center center;
  min-height: 50px;
  cursor: pointer;
  &:hover {
    background: #8a77b5a8;
  }
  margin-bottom: 14px;
`;

export default Settings;
