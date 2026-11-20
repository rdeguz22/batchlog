import { Header } from '../components/Header';
import type { ScreenProps } from './types';

// S10 Summary. TODO: build this screen (F52, F53, F59).
export function SummaryScreen(_props: ScreenProps) {
  return (
    <main>
      <Header title="Summary" />
      <p className="muted">S10 is not built yet.</p>
    </main>
  );
}
