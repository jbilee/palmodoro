import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./reducers/todosReducer";
import timerReducer from "./reducers/timerReducer";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    timer: timerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
