import type { Action, AppState } from '../state/appReducer';

// Props down, callbacks up: every screen gets the state it reads and dispatch for its actions.
export interface ScreenProps {
  state: AppState;
  dispatch: (action: Action) => void;
}
