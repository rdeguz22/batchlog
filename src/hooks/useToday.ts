import { useEffect, useState } from 'react';
import { systemClock, type Clock } from '../model/clock';
import { localDateKey } from '../model/schedule';

// D6: when the app is reopened after midnight, re-read the clock so today's totals reset.
export function useToday(clock: Clock = systemClock): string {
  const [today, setToday] = useState(() => localDateKey(clock()));
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible') setToday(localDateKey(clock()));
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [clock]);
  return today;
}
