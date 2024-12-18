import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getRandomValue } from "../utils/calculations";
import { WALLPAPERS } from "../utils/constants";

// const IMAGE_PATH = "../assets/";

const getRandomWallpaper = () => {
  const randomIndex = getRandomValue(WALLPAPERS.length - 1);
  return WALLPAPERS[randomIndex];
};

const initialState = getRandomWallpaper();

const wallpaperSlice = createSlice({
  name: "wallpaper",
  initialState,
  reducers: {
    uploadWallpaper: (_, action: PayloadAction<string>) => {
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
