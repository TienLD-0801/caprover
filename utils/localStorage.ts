const setLocalStorage = (key: string, value: any) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error setting localStorage:', error);
  }
};

const getLocalStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key);
    if (value === null) return null;
    return JSON.parse(value);
  } catch (error) {
    console.error('Error getting localStorage:', error);
    return null;
  }
};

const removeLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing localStorage:', error);
  }
};

export { setLocalStorage, getLocalStorage, removeLocalStorage };
