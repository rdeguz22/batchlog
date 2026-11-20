import { describe, expect, it } from 'vitest';
import { SCREEN_COMPONENTS } from '../../src/screens';
import { PREVIOUS, SCREENS, TRANSITIONS } from '../../src/state/transitions';

describe('transition table matches Figure 1', () => {
  it('has T1–T61 plus T29b, each once', () => {
    const ids = TRANSITIONS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (let i = 1; i <= 61; i++) expect(ids).toContain(`T${i}`);
    expect(ids).toContain('T29b');
  });

  it('only uses states S1–S12', () => {
    for (const t of TRANSITIONS) {
      expect(SCREENS).toHaveProperty(t.from);
      if (t.to !== PREVIOUS) expect(SCREENS).toHaveProperty(t.to);
    }
  });

  it('every state has a screen component', () => {
    for (const id of Object.keys(SCREENS)) expect(SCREEN_COMPONENTS).toHaveProperty(id);
  });
});
