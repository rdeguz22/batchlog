// Batch math (F23, F35, F43–F50). Grams are integers; calories and macros are kept at
// full precision and rounded only for display, so totals and Undo stay exact.
import type { Batch, LogEntry, LogMethodId, Per100g } from './types';
import { validatePortion, type ValidationResult } from './validate';

const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

// F23: planText(5, 1, 2640) -> '5 meals, about 528 kcal each'
export function planText(days: number, mealsPerDay: number, totalKcal: number): string {
  const meals = days * mealsPerDay;
  return `${meals} meal${meals === 1 ? '' : 's'}, about ${fmt(totalKcal / meals)} kcal each`;
}

// F35: cookedWeight(4000, 1850) -> 2150
export function cookedWeight(scaleReading: number, potWeight: number): number {
  return scaleReading - potWeight;
}

// F35: perMeal(2150, 5) -> 430
export function perMeal(cookedGrams: number, meals: number): number {
  return Math.round(cookedGrams / meals);
}

// Grams left is always derived from the log, never stored, so Undo is exact (F47).
export function gramsLeft(batch: Batch, log: LogEntry[]): number {
  const logged = log.filter((e) => e.batchId === batch.id).reduce((sum, e) => sum + e.grams, 0);
  return batch.cookedWeight - logged;
}

export function portionValues(batch: Batch, grams: number): Per100g {
  const share = grams / batch.cookedWeight;
  return {
    kcal: batch.totals.kcal * share,
    protein: batch.totals.protein * share,
    carbs: batch.totals.carbs * share,
    fat: batch.totals.fat * share,
  };
}

// F43, F46: build a log entry, or return why it can't be logged.
export function logPortion(
  batch: Batch,
  log: LogEntry[],
  grams: number,
  method: LogMethodId,
  now: Date,
): { ok: true; entry: LogEntry } | Extract<ValidationResult, { ok: false }> {
  const check = validatePortion(grams, gramsLeft(batch, log));
  if (!check.ok) return check;
  const v = portionValues(batch, grams);
  return {
    ok: true,
    entry: {
      id: `${batch.id}-${now.getTime()}`,
      batchId: batch.id,
      foodName: null,
      grams,
      calories: v.kcal,
      protein: v.protein,
      carbs: v.carbs,
      fat: v.fat,
      method,
      timestamp: now.toISOString(),
    },
  };
}

// F49: the Close batch card shows at 10% or less left.
export function showCloseCard(batch: Batch, log: LogEntry[]): boolean {
  return gramsLeft(batch, log) / batch.cookedWeight <= 0.1;
}

// F50: the message on Closed Batch.
export function closeMessage(cooked: number, logged: number, gramsPerMeal: number): string {
  const unlogged = cooked - logged;
  if (unlogged / cooked <= 0.05) return 'close match';
  const portions = Math.max(1, Math.round(unlogged / gramsPerMeal));
  return `about ${portions} portion${portions === 1 ? '' : 's'} never got logged`;
}

// TODO F25 batchTotals(ingredients), F18 copyBatch, D2 createBatch
