import { Header } from '../components/Header';
import type { ScreenProps } from './types';

// S2 About You. TODO: build this screen (F6–F8, I10).
export function AboutYouScreen(_props: ScreenProps) {
  return (
    <main>
      <Header title="About You" />
      <p className="muted">S2 is not built yet.</p>
    </main>
  );
}
