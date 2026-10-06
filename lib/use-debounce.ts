import { useState, useEffect } from "react";

/**
 * Custom hook for debouncing fast-changing values (e.g. search input).
 * Avoids excessive API calls / re-renders and is ready for React Query integration.
 *
 * @param value The value to debounce
 * @param delay Milliseconds to wait before updating (default 300ms)
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
