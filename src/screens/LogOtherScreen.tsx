import { FoodSearchList } from '../components/FoodSearchList';
import { Header } from '../components/Header';
import type { ScreenProps } from './types';

// S11 Log Other Food. TODO: build this screen (F54–F57).
export function LogOtherScreen(_props: ScreenProps) {
  return (
    <main>
      <Header title="Log Other Food" />
      <p className="muted">S11 is not built yet.</p>
      <FoodSearchList mode="other" />
    </main>
  );
}
