import { useEffect, useState } from 'react';
import { save } from '../model/storage';
import type { AppData } from '../model/types';

// D1: save whenever the data changes, so no reducer case has to remember to.
// Returns false if the last save failed, so the app can show a one-line warning.
export function usePersist(data: AppData): boolean {
  const [ok, setOk] = useState(true);
  useEffect(() => {
    setOk(save(data));
  }, [data]);
  return ok;
}
