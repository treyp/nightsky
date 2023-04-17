export function setLocalStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Setting localStorage failed for key: ${key}`);
  }
}

export function removeItemLocalStorage(key: string) {
  localStorage.removeItem(key);
}

export function getLocalStorage(key: string) {
  return localStorage.getItem(key);
}
