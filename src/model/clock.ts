// The current time comes from here so tests can fix the date (D6, F37).
export type Clock = () => Date;

export const systemClock: Clock = () => new Date();

export function fixedClock(date: Date): Clock {
  return () => new Date(date.getTime());
}
