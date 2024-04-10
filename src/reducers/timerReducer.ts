import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
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
