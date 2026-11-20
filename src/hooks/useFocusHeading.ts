import { useEffect, useRef } from 'react';

// I9: when a screen opens, move keyboard focus to its heading.
export function useFocusHeading<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return ref;
}
