import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TimeFormat = {
  hours: number;
  minutes: number;
};

type TimerState = {
  pomodoro: TimeFormat;
  shortBreak: TimeFormat;
  longBreak: TimeFormat;
  currentMode: string;
  cycleThreshold: number;
  currentCycle: number;
};

const initialState: TimerState = {
  pomodoro: { hours: 0, minutes: 1 },
  shortBreak: { hours: 0, minutes: 2 },
  longBreak: { hours: 0, minutes: 3 },
  currentMode: "pomodoro",
  cycleThreshold: 3,
  currentCycle: 1,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    selectMode: (state, action: PayloadAction<string>) => {
      return { ...state, currentMode: action.payload };
    },
    changeThreshold: (state, action: PayloadAction<string>) => {
      return { ...state, cycleThreshold: Number(action.payload) };
    },
    resetCycle: (state) => {
      return { ...state, currentCycle: 1 };
    },
    getNextMode: (state) => {
      if (state.currentCycle === state.cycleThreshold) {
        const nextCycle = state.currentMode === "pomodoro" ? state.currentCycle : 1;
        const nextMode = state.currentMode === "pomodoro" ? "longBreak" : "pomodoro";
        return { ...state, currentCycle: nextCycle, currentMode: nextMode };
      } else {
        const nextCycle =
          state.currentMode === "pomodoro" ? state.currentCycle : state.currentCycle + 1;
        const nextMode = state.currentMode === "pomodoro" ? "shortBreak" : "pomodoro";
        return { ...state, currentCycle: nextCycle, currentMode: nextMode };
      }
    },
  },
});

export const { selectMode, changeThreshold, resetCycle, getNextMode } = timerSlice.actions;
export default timerSlice.reducer;
