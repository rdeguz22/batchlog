import { BottomNav } from '../components/BottomNav';
import { Header } from '../components/Header';
import type { ScreenProps } from './types';

// S4 Home. The "hello world" screen for the starting repository.
export function HomeScreen({ state, dispatch }: ScreenProps) {
  return (
    <main>
      <Header title="BatchLog" />
      <p className="muted">Cook once, log it all week.</p>
      <p>Hello world. The interface goes here.</p>
      {/* I11: Start a new batch is a full-width outlined button. */}
      <button
        type="button"
        className="wide"
        data-action="T18"
        onClick={() => dispatch({ type: 'T18' })}
      >
        Start a new batch
      </button>
      <BottomNav screen={state.ui.screen} dispatch={dispatch} />
    </main>
  );
}
