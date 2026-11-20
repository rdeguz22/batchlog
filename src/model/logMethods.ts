// The three ways to log a portion (F42–F45). They differ only in how they turn input into
// grams; validation, the confirmation card, and Undo are shared (logPortion in nutrition.ts).
import type { Container, LogMethodId } from './types';

export type LogInput =
  | { method: 'weight'; grams: number }
  | { method: 'container'; container: Container }
  | { method: 'weighRest'; leftNow: number };

export interface LogMethod {
  id: Exclude<LogMethodId, 'other'>;
  label: string;
  helper: string; // I13: one line of helper text per tab
  toGrams: (input: LogInput, gramsLeft: number) => number;
}

// D4 / F44
export function capacity(c: Container): number {
  return c.fullWeight - c.emptyWeight;
}

export const LOG_METHODS: LogMethod[] = [
  {
    id: 'weight',
    label: 'By weight',
    helper: 'Weigh your plate and enter the grams.',
    toGrams: (input) => (input.method === 'weight' ? input.grams : NaN),
  },
  {
    id: 'container',
    label: 'Container',
    helper: 'Pick a saved container you filled to the top.',
    toGrams: (input) => (input.method === 'container' ? capacity(input.container) : NaN),
  },
  {
    id: 'weighRest',
    label: 'Weigh rest',
    helper: 'Weigh what’s left and we’ll log the difference.',
    // F45: 800 g left, 450 g on the scale now -> 350 g
    toGrams: (input, left) => (input.method === 'weighRest' ? left - input.leftNow : NaN),
  },
];
