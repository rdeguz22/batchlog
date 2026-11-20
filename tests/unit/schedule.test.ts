import { describe, expect, it } from 'vitest';
import { localDateKey, mealDates } from '../../src/model/schedule';
import { validateSchedule } from '../../src/model/validate';

const MON_FRI = [1, 2, 3, 4, 5];

describe('F37 meal dates', () => {
  it('Fri Nov 13, 5 days, Mon–Fri ends Thu Nov 19', () => {
    const dates = mealDates(new Date(2026, 10, 13), 5, MON_FRI).map(localDateKey);
    expect(dates).toEqual(['2026-11-13', '2026-11-16', '2026-11-17', '2026-11-18', '2026-11-19']);
  });
});

describe('F38 no meal days', () => {
  it('rejects an empty day set', () => {
    expect(validateSchedule([])).toMatchObject({ ok: false, message: 'Pick at least one day.' });
  });
});

describe('D6 local dates', () => {
  it('a 9 pm entry keeps its local date', () => {
    expect(localDateKey(new Date(2026, 10, 19, 21, 30))).toBe('2026-11-19');
  });
});
