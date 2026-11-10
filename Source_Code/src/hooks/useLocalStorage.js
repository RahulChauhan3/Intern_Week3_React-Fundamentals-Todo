import { useEffect, useState } from 'react';

/**
 * useState that persists to localStorage.
 * - Lazy initialiser reads storage once on mount.
 * - useEffect writes back whenever the value changes.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or unavailable: the app still works in memory */
    }
  }, [key, value]);

  return [value, setValue];
}
