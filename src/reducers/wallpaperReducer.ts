import { createSlice } from "@reduxjs/toolkit";
import { getRandomValue } from "../utils/utilities";
import { WALLPAPERS } from "../utils/constants";
import type { PayloadAction } from "@reduxjs/toolkit";

type Wallpaper = string;

// const IMAGE_PATH = "../assets/";

const getRandomWallpaper = () => {
  const randomIndex = getRandomValue(WALLPAPERS.length - 1);
  return WALLPAPERS[randomIndex];
};

const initialState: Wallpaper = getRandomWallpaper();

const wallpaperSlice = createSlice({
  name: "wallpaper",
  initialState,
  reducers: {
    uploadWallpaper: (_, action: PayloadAction<Wallpaper>) => {
      return action.payload;
    },
    randomizeWallpaper: (state) => {
      let newWallpaper;
      do {
        newWallpaper = getRandomWallpaper();
      } while (newWallpaper === state);
      return newWallpaper;
    },
  },
});

export const { uploadWallpaper, randomizeWallpaper } = wallpaperSlice.actions;
export default wallpaperSlice.reducer;
