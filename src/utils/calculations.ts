export const calculateHours = (time: number) => {
  return Math.floor(time / 3600);
};

export const calculateMinutes = (time: number) => {
  return Math.floor((time - Math.floor(time / 3600) * 3600) / 60);
};

export const calculateSeconds = (time: number) => {
  return time - Math.floor(time / 3600) * 3600 - Math.floor((time - Math.floor(time / 3600) * 3600) / 60) * 60;
};

export const getRandomValue = (cap: number) => Math.floor(Math.random() * (cap + 1));

export const getTime = (time: number) => {
  return `${calculateHours(time).toString().padStart(2, "0")}:${calculateMinutes(time)
    .toString()
    .padStart(2, "0")}:${calculateSeconds(time).toString().padStart(2, "0")}`;
};
