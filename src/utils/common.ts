export const getLocalData = <T = any>(key: string): T | null => {
  try {
    const raw = localStorage.getItem(key);

    if (!raw || raw.trim() === "") return null;

    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`Failed to parse localStorage data for key "${key}":`, error);
    return null;
  }
};

export const setLocalData = (key: string, value: any) => {
  try {
    const isSuccess = localStorage.setItem(key, JSON.stringify(value));
    return isSuccess;
  } catch (error) {
    console.error(error);
    return false;
  }
};
