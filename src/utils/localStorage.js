export function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Setting localStorage failed for key: ${key}`);
  }
}

export function removeItemLocalStorage(key) {
  localStorage.removeItem(key);
}

export function getLocalStorage(key) {
  return localStorage.getItem(key);
}
