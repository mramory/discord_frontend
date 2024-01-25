import {useState, useCallback, useRef, useEffect} from 'react';
import {SetStateAction} from "react"

const useStateWithCallback = (initialState: string[] | SetStateAction<any>) => {
  const [state, setState] = useState(initialState);
  const cbRef = useRef<((arg: string | string[]) => void) | null>(null);

  const updateState = useCallback((newState: string[] | SetStateAction<any>, cb: (arg: string | string[]) => void) => {
    cbRef.current = cb;

    setState((prev: string[]) => typeof newState === 'function' ? newState(prev) : newState);
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null;
    }
  }, [state]);

  return [state, updateState];
}

export default useStateWithCallback;