import { describe, expect, it } from 'vitest';
import {
  applyPreset,
  macroCalories,
  macroCheck,
  rescale,
  suggestMacros,
} from '../../src/model/macros';
import { validateGoal } from '../../src/model/validate';

describe('F9 presets', () => {
  it('Maintain fills 2,600 kcal / 195 g / 293 g / 72 g', () => {
    expect(applyPreset('Maintain')).toEqual({ calories: 2600, protein: 195, carbs: 293, fat: 72 });
  });
});

describe('F10 macros fill from calories', () => {
  it('suggestMacros(2800) returns 210 g, 315 g, 78 g', () => {
    expect(suggestMacros(2800)).toEqual({ protein: 210, carbs: 315, fat: 78 });
  });

  it('macro calories total within 10 kcal of the goal', () => {
    for (const kcal of [1000, 1850, 2200, 2600, 3333, 6000]) {
      expect(Math.abs(macroCalories(suggestMacros(kcal)) - kcal)).toBeLessThanOrEqual(10);
    }
  });
});

describe('F11 user-edited macros', () => {
  it('states the difference when more than 100 kcal off', () => {
    const goal = { ...applyPreset('Maintain'), protein: 195 + 37.5 }; // +150 kcal
    expect(macroCheck(goal).message).toBe('150 kcal over your goal');
  });

  it('says nothing within 100 kcal', () => {
    expect(macroCheck(applyPreset('Maintain')).message).toBeNull();
  });

  it('rescale keeps the user split within 1%', () => {
    const custom = { calories: 2000, protein: 200, carbs: 150, fat: 67 };
    const scaled = rescale(custom, 3000);
    const proteinShare = (g: typeof custom) => (g.protein * 4) / macroCalories(g);
    expect(Math.abs(proteinShare(scaled) - proteinShare(custom))).toBeLessThan(0.01);
  });
});

describe('F12 goal validation', () => {
  const ok = applyPreset('Maintain');
  it('accepts a valid goal', () => expect(validateGoal(ok).ok).toBe(true));
  it('rejects under 1,000 and over 6,000 kcal', () => {
    expect(validateGoal({ ...ok, calories: 999 })).toMatchObject({ ok: false, field: 'calories' });
    expect(validateGoal({ ...ok, calories: 6001 })).toMatchObject({ ok: false, field: 'calories' });
  });
  it('rejects a blank or negative macro', () => {
    expect(validateGoal({ ...ok, protein: NaN })).toMatchObject({ ok: false, field: 'protein' });
    expect(validateGoal({ ...ok, fat: -5 })).toMatchObject({ ok: false, field: 'fat' });
  });
});
