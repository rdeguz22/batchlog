import { useEffect } from 'react';
import type { Action } from '../state/appReducer';
import type { ScreenId } from '../state/transitions';

// The phone's Back gesture fires hashchange. It should trigger the same transitions as the
// on-screen Back buttons (T8, T14, T37, T42), and anything else is refused.
export function useHashBack(screen: ScreenId, _dispatch: (a: Action) => void): void {
  useEffect(() => {
    const onHashChange = () => {
      // TODO: map the new hash to the matching Back transition and dispatch it;
      // if there is none, reset the hash to the current screen.
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [screen]);
}
