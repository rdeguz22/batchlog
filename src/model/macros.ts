// Daily goal macros (F9–F11). The 30/45/25 split is only a suggestion; users can edit any macro.
import type { Goal } from './types';

export const KCAL_PER_GRAM = { protein: 4, carbs: 4, fat: 9 } as const;
export const DEFAULT_SPLIT = { protein: 0.3, carbs: 0.45, fat: 0.25 };
export const PRESETS = { Cut: 2200, Maintain: 2600, Bulk: 3000 } as const;
export type PresetName = keyof typeof PRESETS;

type Split = typeof DEFAULT_SPLIT;
type Macros = Omit<Goal, 'calories'>;

// F10: suggestMacros(2800) -> { protein: 210, carbs: 315, fat: 78 }
export function suggestMacros(calories: number, split: Split = DEFAULT_SPLIT): Macros {
  return {
    protein: Math.round((calories * split.protein) / KCAL_PER_GRAM.protein),
    carbs: Math.round((calories * split.carbs) / KCAL_PER_GRAM.carbs),
    fat: Math.round((calories * split.fat) / KCAL_PER_GRAM.fat),
  };
}

// F9: applyPreset('Maintain') -> 2,600 / 195 / 293 / 72
export function applyPreset(name: PresetName): Goal {
  const calories = PRESETS[name];
  return { calories, ...suggestMacros(calories) };
}

export function macroCalories({ protein, carbs, fat }: Macros): number {
  return protein * KCAL_PER_GRAM.protein + carbs * KCAL_PER_GRAM.carbs + fat * KCAL_PER_GRAM.fat;
}

// F11: report the difference once it is more than 100 kcal.
export function macroCheck(goal: Goal): { diff: number; message: string | null } {
  const diff = Math.round(macroCalories(goal) - goal.calories);
  if (Math.abs(diff) <= 100) return { diff, message: null };
  return { diff, message: `${Math.abs(diff)} kcal ${diff > 0 ? 'over' : 'under'} your goal` };
}

// F11: when calories change after the user edited macros, keep their split.
export function rescale(goal: Goal, newCalories: number): Goal {
  const total = macroCalories(goal);
  if (total === 0) return { calories: newCalories, ...suggestMacros(newCalories) };
  const split = {
    protein: (goal.protein * KCAL_PER_GRAM.protein) / total,
    carbs: (goal.carbs * KCAL_PER_GRAM.carbs) / total,
    fat: (goal.fat * KCAL_PER_GRAM.fat) / total,
  };
  return { calories: newCalories, ...suggestMacros(newCalories, split) };
}
