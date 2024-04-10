import { createSlice } from "@reduxjs/toolkit";
import { SFX } from "../utils/constants";
import type { PayloadAction } from "@reduxjs/toolkit";

export type SettingsProps = {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  sound: { legend: string; url: string };
};

const getStorage = (): SettingsProps | undefined => {
  const storedData = localStorage.getItem("palmo-s");
  if (!storedData) return undefined;
  return JSON.parse(storedData);
};

const saveToStorage = (state: SettingsProps) => {
  localStorage.setItem("palmo-s", JSON.stringify(state));
};

const initialState = getStorage() || {
  pomodoro: 1,
  shortBreak: 1,
  longBreak: 1,
  sound: {
    legend: "Ping",
    url: "/src/assets/sounds/ping-82822.mp3",
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    saveTime: (state, action: PayloadAction<{ time: number; mode: string }>) => {
      const { time, mode } = action.payload;
      let newState;
      switch (mode) {
        case "pomodoro": {
          newState = { ...state, pomodoro: time };
          break;
        }
        case "shortBreak": {
          newState = { ...state, shortBreak: time };
          break;
        }
        case "longBreak": {
          newState = { ...state, longBreak: time };
          break;
        }
        default:
          return { ...state };
      }
      saveToStorage(newState);
      return newState;
    },
    saveSound: (state, action: PayloadAction<string>) => {
      const sound = SFX.find((obj) => obj.legend === action.payload) as {
        legend: string;
        url: string;
      };
      const newState = { ...state, sound };
      saveToStorage(newState);
      return newState;
    },
  },
});

export const { saveTime, saveSound } = settingsSlice.actions;
export default settingsSlice.reducer;
