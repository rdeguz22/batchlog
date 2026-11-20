// Meal dates and local-date keys. Never use toISOString() for dates: it is UTC,
// so food logged after 7 pm in Boston would count toward tomorrow (D6).

export function localDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function fromDateKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

// F37: the dates the user will eat from the batch, skipping days that are off.
// mealDates(Fri Nov 13, 5 days, Mon–Fri) -> Fri 13, Mon 16, Tue 17, Wed 18, Thu 19.
export function mealDates(start: Date, days: number, mealDays: number[]): Date[] {
  if (mealDays.length === 0) return [];
  const out: Date[] = [];
  const day = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  while (out.length < days) {
    if (mealDays.includes(day.getDay())) out.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }
  return out;
}

// TODO D6 dailyTotals(log, clock), F59 weeklyTotals
