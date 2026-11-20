// The only code that changes app data (Flux-style). appReducer(state, action) -> next state.
// It must stay pure: no localStorage, no clock, no hashing. Handlers pass in what they need
// (for example the current time) as part of the action.
import { logPortion } from '../model/nutrition';
import type { AppData, LogMethodId } from '../model/types';
import { findTransition, PREVIOUS, type ScreenId } from './transitions';

export interface UiState {
  screen: ScreenId;
  returnStack: ScreenId[];
  openBatchId: string | null;
  lastLoggedId: string | null; // shows the Portion logged card with Undo (F47)
  errors: Record<string, string>; // field -> message (I6)
}

export interface AppState {
  data: AppData; // saved (D1)
  ui: UiState; // never saved
}

// Every action is named after its transition in Figure 1.
export type Action =
  | { type: 'T19' | 'T51' | 'T52'; batchId: string }
  | { type: 'T44'; grams: number; method: LogMethodId; now: string }
  | { type: string; [key: string]: unknown };

// Setup screens are never a place to "go back" to after setup is finished.
const SETUP: ScreenId[] = ['S1', 'S2'];
// Moves that start a fresh history: logging in or out, and the bottom navigation tabs.
const RESETS = new Set(['T2', 'T24', 'T23', 'T55', 'T56']);

export function initialState(data: AppData, screen: ScreenId = 'S1'): AppState {
  return {
    data,
    ui: { screen, returnStack: [], openBatchId: null, lastLoggedId: null, errors: {} },
  };
}

function navigate(ui: UiState, id: string, to: ScreenId | typeof PREVIOUS): UiState {
  if (to === PREVIOUS) {
    const stack = [...ui.returnStack];
    let back = stack.pop();
    // e.g. T13 at the end of setup goes to Home, not back to About You.
    if (!back || SETUP.includes(back)) back = 'S4';
    return { ...ui, screen: back, returnStack: stack, errors: {} };
  }
  if (to === ui.screen) return ui;
  const returnStack = RESETS.has(id) ? [] : [...ui.returnStack, ui.screen];
  return { ...ui, screen: to, returnStack, errors: {}, lastLoggedId: null };
}

export function appReducer(state: AppState, action: Action): AppState {
  const t = findTransition(state.ui.screen, action.type);
  if (!t) return state; // not an arrow out of this screen: refused

  // Data changes first, then navigation.
  switch (action.type) {
    case 'T19':
    case 'T51':
    case 'T52': {
      const batchId = action.batchId as string;
      const ui = navigate(state.ui, t.id, t.to);
      return { ...state, ui: { ...ui, openBatchId: batchId } };
    }

    case 'T44': {
      // Log a portion. Invalid input becomes T45: the screen stays and shows the error.
      const batch = state.data.batches.find((b) => b.id === state.ui.openBatchId);
      if (!batch) return state;
      const a = action as Extract<Action, { type: 'T44' }>;
      const result = logPortion(batch, state.data.log, a.grams, a.method, new Date(a.now));
      if (!result.ok) {
        return { ...state, ui: { ...state.ui, errors: { [result.field]: result.message } } };
      }
      return {
        data: { ...state.data, log: [...state.data.log, result.entry] },
        ui: { ...state.ui, errors: {}, lastLoggedId: result.entry.id },
      };
    }

    case 'T46': {
      // Undo: the inverse of "add this entry" is "remove this entry" (command pattern).
      const id = state.ui.lastLoggedId;
      if (!id) return state;
      return {
        data: { ...state.data, log: state.data.log.filter((e) => e.id !== id) },
        ui: { ...state.ui, lastLoggedId: null },
      };
    }

    // TODO: a case for each remaining data-changing transition (T2, T3, T6, T13, T35, T41,
    // T47, T48, T58, T60 ...), following validate -> call the model -> return next state.

    default:
      return { ...state, ui: navigate(state.ui, t.id, t.to) };
  }
}
