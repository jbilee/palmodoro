import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./reducers/settingsReducer";
import timerReducer from "./reducers/timerReducer";
import todosReducer from "./reducers/todosReducer";
import wallpaperReducer from "./reducers/wallpaperReducer";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    timer: timerReducer,
    wallpaper: wallpaperReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
