import { useState, useCallback, useRef, useEffect, SetStateAction } from 'react';

function useStateWithCallback<T>(initialState: T | SetStateAction<T>) {
  const [state, setState] = useState(initialState);
  const cbRef = useRef<((arg: T | SetStateAction<T>) => void) | null>(null);

  const updateState = useCallback((newState: T | SetStateAction<T>, cb: (arg: T | SetStateAction<T>) => void) => {
    cbRef.current = cb;

    setState((prev) => typeof newState === 'function' ? (newState as (prev: T | SetStateAction<T>) => T)(prev) : newState);
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null;
    }
  }, [state]);

  return [state, updateState] as const;
}

export default useStateWithCallback;