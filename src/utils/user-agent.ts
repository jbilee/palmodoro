export const isMobile = () => {
  const agent = navigator.userAgent;
  const regex = /Android|iPad|iPhone/;
  return regex.test(agent);
};
