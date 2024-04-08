import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "./reducers/timerReducer";
import todosReducer from "./reducers/todosReducer";
import wallpaperReducer from "./reducers/wallpaperReducer";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    timer: timerReducer,
    wallpaper: wallpaperReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
