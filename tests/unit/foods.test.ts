import { describe, expect, it } from 'vitest';
import {
  createLabelFood,
  FOODS,
  foodValues,
  kcalFor,
  searchFoods,
} from '../../src/model/foodRepository';

describe('D5 bundled foods', () => {
  it('covers at least 15 foods, each with numeric values for every listed state', () => {
    expect(FOODS.length).toBeGreaterThanOrEqual(15);
    for (const food of FOODS) {
      for (const v of Object.values(food.states)) {
        for (const k of ['kcal', 'protein', 'carbs', 'fat'] as const) {
          expect(typeof v![k]).toBe('number');
        }
      }
    }
  });
});

describe('F29–F31 search and values', () => {
  it('searchFoods("RICE") returns the rice items', () => {
    expect(searchFoods('RICE').map((f) => f.name)).toEqual(['White rice', 'Brown rice']);
  });
  it('cooked penne is 157 kcal per 100 g', () => {
    expect(foodValues('Penne', 'cooked')?.kcal).toBe(157);
  });
  it('1,500 g raw chicken breast is 1,800 kcal', () => {
    expect(kcalFor('Chicken breast', 'raw', 1500)).toBe(1800);
  });
});

describe('F33 nutrition label', () => {
  it('a 400 g serving with 840 kcal is 210 kcal per 100 g', () => {
    const food = createLabelFood({
      name: 'Lasagna',
      servingGrams: 400,
      kcal: 840,
      protein: 40,
      carbs: 80,
      fat: 36,
    });
    expect(food.states.cooked?.kcal).toBe(210);
  });
});
