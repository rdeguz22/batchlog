import { describe, expect, it } from 'vitest';
import { gramsLeft } from '../../src/model/nutrition';
import { appReducer, initialState, type Action, type AppState } from '../../src/state/appReducer';
import { dataWith } from './fixtures';

const NOW = new Date(2026, 10, 19, 12, 0).toISOString();
const run = (state: AppState, ...actions: Action[]) => actions.reduce(appReducer, state);
const batchState = () => run(initialState(dataWith(), 'S10'), { type: 'T51', batchId: 'b1' });
const left = (s: AppState) => gramsLeft(s.data.batches[0], s.data.log);

describe('navigation', () => {
  it('refuses a transition that is not an arrow out of the current screen', () => {
    const s = initialState(dataWith(), 'S4');
    expect(appReducer(s, { type: 'T48' })).toBe(s);
  });

  it('new batch flow: S4 -> S5 -> S6 -> S5 -> S7', () => {
    const s = run(
      initialState(dataWith(), 'S4'),
      { type: 'T18' },
      { type: 'T27' },
      { type: 'T35' },
      { type: 'T29' },
    );
    expect(s.ui.screen).toBe('S7');
  });

  it('F51: Done on a batch returns to the screen that opened it', () => {
    expect(run(batchState(), { type: 'T49' }).ui.screen).toBe('S10');
  });

  it('F13: finishing setup goes Home; saving an edited goal returns to its opener', () => {
    const setup = run(
      initialState(dataWith(), 'S1'),
      { type: 'T3' },
      { type: 'T6' },
      { type: 'T13' },
    );
    expect(setup.ui.screen).toBe('S4');
    const edit = run(initialState(dataWith(), 'S10'), { type: 'T53' }, { type: 'T13' });
    expect(edit.ui.screen).toBe('S10');
  });

  it('F14: Got it returns to the screen that opened the Macros Explainer', () => {
    expect(run(initialState(dataWith(), 'S4'), { type: 'T25' }, { type: 'T16' }).ui.screen).toBe(
      'S4',
    );
  });
});

describe('logging a portion (T44–T46)', () => {
  it('F43: logs 410 g and leaves 1,790 g', () => {
    const s = run(batchState(), { type: 'T44', grams: 410, method: 'weight', now: NOW });
    expect(s.data.log).toHaveLength(1);
    expect(left(s)).toBe(1790);
    expect(s.ui.lastLoggedId).toBe(s.data.log[0].id);
  });

  it('F46 / T45: an invalid portion logs nothing and shows the error', () => {
    const s = run(batchState(), { type: 'T44', grams: 5000, method: 'weight', now: NOW });
    expect(s.data.log).toHaveLength(0);
    expect(s.ui.errors.portion).toBe('Only 2,200 g is left in this batch.');
  });

  it('F47: Undo restores grams left exactly', () => {
    const s = run(
      batchState(),
      { type: 'T44', grams: 410, method: 'weight', now: NOW },
      { type: 'T46' },
    );
    expect(s.data.log).toHaveLength(0);
    expect(left(s)).toBe(2200);
  });
});
