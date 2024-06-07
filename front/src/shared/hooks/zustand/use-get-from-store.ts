import { useState, useEffect } from 'react';

export function useGetFromStore(store: any, callback: (state: any) => unknown | undefined) {
  const result = store(callback);
  const [state, setState] = useState();
  useEffect(() => {
    setState(result);
  }, [result]);
  return state;
}
