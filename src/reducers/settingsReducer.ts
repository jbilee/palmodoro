import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getStorage, saveToStorage } from "../utils/storage";
import { SFX } from "../utils/constants";

export type SettingsProps = {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  cycleThreshold: number;
  sound: { legend: string; url: string };
};

const initialState = getStorage<SettingsProps>("palmo-s") || {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 20,
  cycleThreshold: 4,
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
      saveToStorage(newState, "palmo-s");
      return newState;
    },
    saveThreshold: (state, action: PayloadAction<number>) => {
      const newState = { ...state, cycleThreshold: action.payload };
      saveToStorage(newState, "palmo-s");
      return newState;
    },
    saveSound: (state, action: PayloadAction<string>) => {
      const sound = SFX.find((obj) => obj.legend === action.payload) as {
        legend: string;
        url: string;
      };
      const newState = { ...state, sound };
      saveToStorage(newState, "palmo-s");
      return newState;
    },
  },
});

export const { saveTime, saveThreshold, saveSound } = settingsSlice.actions;
export default settingsSlice.reducer;
