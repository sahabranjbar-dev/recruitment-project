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
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Failed to Add localStorage data for key "${key}":`, error);
    return false;
  }
};

export const removeItemLocalData = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(
      `Failed to Remove localStorage data for key "${key}":`,
      error
    );
  }
};

export const clearLocalData = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Failed to Clear localStorage data", error);
  }
};
