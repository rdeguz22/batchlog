import { useReducer } from 'react';
import { usePersist } from './hooks/usePersist';
import { useHashBack } from './hooks/useHashBack';
import { useToday } from './hooks/useToday';
import { load } from './model/storage';
import { SCREEN_COMPONENTS } from './screens';
import { appReducer, initialState } from './state/appReducer';

export function App() {
  // Login (S1) comes first in the finished app. Start on Home until S1 is built.
  const [state, dispatch] = useReducer(appReducer, undefined, () => initialState(load(), 'S4'));
  const saved = usePersist(state.data);
  useHashBack(state.ui.screen, dispatch);
  useToday(); // TODO: pass today to screens that show daily totals (D6)

  const Screen = SCREEN_COMPONENTS[state.ui.screen];
  return (
    <>
      {!saved && (
        <p className="error" role="alert">
          Changes can’t be saved in this browser and will be lost when you close it.
        </p>
      )}
      <Screen key={state.ui.screen} state={state} dispatch={dispatch} />
    </>
  );
}
