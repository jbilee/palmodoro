export const playAudio = (path: string) => {
  const audio = new Audio(path);
  audio.play();
};
