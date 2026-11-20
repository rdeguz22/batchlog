import { describe, expect, it } from 'vitest';
import { capacity, LOG_METHODS } from '../../src/model/logMethods';
import {
  closeMessage,
  cookedWeight,
  gramsLeft,
  logPortion,
  perMeal,
  planText,
  showCloseCard,
} from '../../src/model/nutrition';
import { validateWeigh } from '../../src/model/validate';
import { testBatch } from './fixtures';

const NOW = new Date(2026, 10, 19, 12, 0);

describe('F23 plan line', () => {
  it('planText(5, 1, 2640) shows 5 meals at about 528 kcal', () => {
    expect(planText(5, 1, 2640)).toBe('5 meals, about 528 kcal each');
  });
});

describe('F35–F36 weighing', () => {
  it('cookedWeight(4000, 1850) is 2,150 g, 430 g per meal', () => {
    expect(cookedWeight(4000, 1850)).toBe(2150);
    expect(perMeal(2150, 5)).toBe(430);
  });
  it('validateWeigh rejects 1,800 with a 1,850 pot', () => {
    expect(validateWeigh(1800, 1850).ok).toBe(false);
    expect(validateWeigh(4000, 1850).ok).toBe(true);
  });
});

describe('F43 log by weight', () => {
  it('410 g of a 2,200 g / 2,876 kcal batch is 536 kcal and leaves 1,790 g', () => {
    const batch = testBatch();
    const result = logPortion(batch, [], 410, 'weight', NOW);
    if (!result.ok) throw new Error(result.message);
    expect(Math.round(result.entry.calories)).toBe(536);
    expect(gramsLeft(batch, [result.entry])).toBe(1790);
  });

  it('D3: the entry has every field', () => {
    const result = logPortion(testBatch(), [], 410, 'weight', NOW);
    if (!result.ok) throw new Error(result.message);
    for (const f of [
      'id',
      'batchId',
      'grams',
      'calories',
      'protein',
      'carbs',
      'fat',
      'method',
      'timestamp',
    ]) {
      expect(result.entry).toHaveProperty(f);
    }
  });
});

describe('F44–F45 container and weigh rest', () => {
  it('a 350 g / 750 g container logs 400 g', () => {
    expect(capacity({ name: 'Glass', emptyWeight: 350, fullWeight: 750 })).toBe(400);
  });
  it('800 g left with 450 g on the scale logs 350 g', () => {
    const weighRest = LOG_METHODS.find((m) => m.id === 'weighRest')!;
    expect(weighRest.toGrams({ method: 'weighRest', leftNow: 450 }, 800)).toBe(350);
  });
});

describe('F46 invalid portions', () => {
  const batch = testBatch({ cookedWeight: 1790 });
  it.each([0, -10, NaN])('rejects %s g', (g) => {
    expect(logPortion(batch, [], g, 'weight', NOW).ok).toBe(false);
  });
  it('rejects more than what is left', () => {
    expect(logPortion(batch, [], 1800, 'weight', NOW)).toMatchObject({
      ok: false,
      message: 'Only 1,790 g is left in this batch.',
    });
  });
});

describe('F49–F50 closing', () => {
  it('Close batch card at 8% left, not at 40%', () => {
    const batch = testBatch({ cookedWeight: 2000 });
    const entry = (grams: number) => ({ ...logOk(batch, grams) });
    expect(showCloseCard(batch, [entry(1840)])).toBe(true);
    expect(showCloseCard(batch, [entry(1200)])).toBe(false);
  });
  it('3% unlogged is a close match; 23% names the missing portions', () => {
    expect(closeMessage(2000, 1940, 400)).toBe('close match');
    expect(closeMessage(2000, 1540, 400)).toBe('about 1 portion never got logged');
  });
});

function logOk(batch: ReturnType<typeof testBatch>, grams: number) {
  const r = logPortion(batch, [], grams, 'weight', NOW);
  if (!r.ok) throw new Error(r.message);
  return r.entry;
}
