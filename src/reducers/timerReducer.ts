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
};

const initialState: TimerState = {
  pomodoro: { hours: 0, minutes: 1 },
  shortBreak: { hours: 0, minutes: 2 },
  longBreak: { hours: 0, minutes: 3 },
  currentMode: "pomodoro",
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    changeMode: (state, action: PayloadAction<string>) => {
      state.currentMode = action.payload;
    },
  },
});

export const { changeMode } = timerSlice.actions;
export default timerSlice.reducer;
