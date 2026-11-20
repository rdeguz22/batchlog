// The one source of food data (D5). Screens never import foods.json directly, so a
// nutrition API could replace this file later without changing anything else.
import data from '../data/foods.json';
import type { Food, FoodState, Per100g } from './types';

export const FOODS: Food[] = data.foods as Food[];

// F31: foodValues('Penne', 'cooked') -> 157 kcal per 100 g
export function foodValues(name: string, state: FoodState, foods = FOODS): Per100g | null {
  const food = foods.find((f) => f.name.toLowerCase() === name.toLowerCase());
  return food?.states[state] ?? null;
}

// F30: kcalFor('Chicken breast', 'raw', 1500) -> 1800
export function kcalFor(name: string, state: FoodState, grams: number): number | null {
  const v = foodValues(name, state);
  return v ? Math.round((v.kcal * grams) / 100) : null;
}

// F29: case-insensitive search by name. TODO: "No match for [text]" message, recents (D7).
export function searchFoods(query: string, foods = FOODS): Food[] {
  const q = query.trim().toLowerCase();
  return q ? foods.filter((f) => f.name.toLowerCase().includes(q)) : foods;
}

export interface LabelInput {
  name: string;
  servingGrams: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

// F33: convert a nutrition label (per serving) to per-100 g values.
// A 400 g serving with 840 kcal -> 210 kcal per 100 g.
export function createLabelFood(label: LabelInput): Food {
  const k = 100 / label.servingGrams;
  return {
    name: label.name,
    states: {
      cooked: {
        kcal: label.kcal * k,
        protein: label.protein * k,
        carbs: label.carbs * k,
        fat: label.fat * k,
      },
    },
  };
}
