// One validator per form. Each returns { ok: true } or the field and message to show (I6).
import type { Goal } from './types';

export type ValidationResult = { ok: true } | { ok: false; field: string; message: string };

const OK: ValidationResult = { ok: true };
const fail = (field: string, message: string): ValidationResult => ({ ok: false, field, message });
const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

export const GOAL_MIN = 1000;
export const GOAL_MAX = 6000;

// F12
export function validateGoal(goal: Goal): ValidationResult {
  if (!Number.isFinite(goal.calories) || goal.calories < GOAL_MIN || goal.calories > GOAL_MAX) {
    return fail(
      'calories',
      `Daily goal must be between ${fmt(GOAL_MIN)} and ${fmt(GOAL_MAX)} kcal.`,
    );
  }
  for (const key of ['protein', 'carbs', 'fat'] as const) {
    if (!Number.isFinite(goal[key]) || goal[key] < 0) {
      return fail(key, `Enter ${key} in grams (0 or more).`);
    }
  }
  return OK;
}

// F36
export function validateWeigh(scaleReading: number, potWeight: number): ValidationResult {
  if (!Number.isFinite(scaleReading) || scaleReading <= potWeight) {
    return fail('scaleReading', 'The scale reading must be more than the pot weight.');
  }
  return OK;
}

// F38
export function validateSchedule(mealDays: number[]): ValidationResult {
  return mealDays.length === 0 ? fail('mealDays', 'Pick at least one day.') : OK;
}

// F46
export function validatePortion(grams: number, gramsLeft: number): ValidationResult {
  if (!Number.isFinite(grams) || grams <= 0) {
    return fail('portion', 'Enter a portion of more than 0 g.');
  }
  if (grams > gramsLeft) {
    return fail('portion', `Only ${fmt(gramsLeft)} g is left in this batch.`);
  }
  return OK;
}

// TODO F4 validateAuth, F33 label form, F48 saveContainer, F55 quickAdd
