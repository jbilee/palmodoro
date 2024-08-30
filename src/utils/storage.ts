export const getStorage = <T>(key: string): T | undefined => {
  const storedData = localStorage.getItem(key);
  if (!storedData) return undefined;
  return JSON.parse(storedData);
};

export const saveToStorage = <T>(state: T, key: string) => {
  localStorage.setItem(key, JSON.stringify(state));
};
