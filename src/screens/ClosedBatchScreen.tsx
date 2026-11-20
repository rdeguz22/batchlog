import { Header } from '../components/Header';
import type { ScreenProps } from './types';

// S9 Closed Batch. TODO: build this screen (F49–F51).
export function ClosedBatchScreen(_props: ScreenProps) {
  return (
    <main>
      <Header title="Closed Batch" />
      <p className="muted">S9 is not built yet.</p>
    </main>
  );
}
