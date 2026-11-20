import { useState } from 'react';
import { searchFoods } from '../model/foodRepository';

// Shared by Add Ingredients (S6) and Log Other Food (S11) through the mode prop.
// TODO F29–F33: checkboxes, grams fields, raw/cooked/dry, "No match" message.
export function FoodSearchList({ mode }: { mode: 'ingredients' | 'other' }) {
  const [query, setQuery] = useState('');
  const results = searchFoods(query);
  return (
    <div className={`food-search ${mode}`}>
      <input
        aria-label="Search foods"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search foods"
      />
      <ul>
        {results.map((f) => (
          <li key={f.name}>{f.name}</li>
        ))}
      </ul>
    </div>
  );
}
