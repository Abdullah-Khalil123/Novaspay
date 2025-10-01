import { useState, useEffect } from 'react';

/**
 * A hook that delays updating a value until after a specified timeout.
 * Useful for reducing API calls on fast-changing values like search inputs.
 *
 * @param value The value to debounce
 * @param delay The delay time in milliseconds
 * @returns The debounced value
 */
function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if the value changes before the delay has passed
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
