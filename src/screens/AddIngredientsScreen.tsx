import { FoodSearchList } from '../components/FoodSearchList';
import { Header } from '../components/Header';
import type { ScreenProps } from './types';

// S6 Add Ingredients. TODO: build this screen (F28–F34).
export function AddIngredientsScreen(_props: ScreenProps) {
  return (
    <main>
      <Header title="Add Ingredients" />
      <p className="muted">S6 is not built yet.</p>
      <FoodSearchList mode="ingredients" />
    </main>
  );
}
