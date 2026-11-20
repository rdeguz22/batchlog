import { emptyData } from '../../src/model/storage';
import type { AppData, Batch } from '../../src/model/types';

// A 2,200 g batch worth 2,876 kcal, as in the spec's examples (F43).
export function testBatch(overrides: Partial<Batch> = {}): Batch {
  return {
    id: 'b1',
    name: 'Chicken penne',
    ingredients: [],
    days: 5,
    mealsPerDay: 1,
    potWeight: 1850,
    cookedWeight: 2200,
    totals: { kcal: 2876, protein: 220, carbs: 300, fat: 80 },
    startDate: '2026-11-13',
    mealDays: [1, 2, 3, 4, 5],
    createdDate: '2026-11-13',
    closed: false,
    closedDate: null,
    ...overrides,
  };
}

export function dataWith(batch: Batch = testBatch()): AppData {
  return { ...emptyData(), batches: [batch] };
}
