// Figure 1 (docs/state-diagram.png) as data. Every arrow in the diagram is one row here,
// and appReducer refuses any transition that is not listed for the current screen.

export const SCREENS = {
  S1: 'Login / Sign up',
  S2: 'About You',
  S3: 'Daily Goal',
  S4: 'Home',
  S5: 'New Batch',
  S6: 'Add Ingredients',
  S7: 'Weigh & Schedule',
  S8: 'Batch',
  S9: 'Closed Batch',
  S10: 'Summary',
  S11: 'Log Other Food',
  S12: 'Macros Explainer',
} as const;

export type ScreenId = keyof typeof SCREENS;

// PREVIOUS returns to the screen that opened this one (the return stack).
export const PREVIOUS = 'PREVIOUS';
type Target = ScreenId | typeof PREVIOUS;

export interface Transition {
  id: string;
  from: ScreenId;
  to: Target;
  event: string;
}

const T = (id: string, from: ScreenId, to: Target, event: string): Transition => ({
  id,
  from,
  to,
  event,
});

// from === to means a self-transition: the screen stays open and updates.
export const TRANSITIONS: Transition[] = [
  T('T1', 'S1', 'S1', 'toggle Log in / Sign up tab'),
  T('T2', 'S1', 'S4', 'log in'),
  T('T3', 'S1', 'S2', 'sign up'),
  T('T4', 'S1', 'S1', 'invalid input [error]'),
  T('T5', 'S1', 'S1', 'forgot password'),
  T('T6', 'S2', 'S3', 'save & next'),
  T('T7', 'S2', 'S3', 'skip'),
  T('T8', 'S2', 'S1', 'back'),
  T('T9', 'S3', 'S3', 'pick preset'),
  T('T10', 'S3', 'S3', 'enter calories (macros auto-fill)'),
  T('T11', 'S3', 'S3', 'edit a macro'),
  T('T12', 'S3', 'S3', 'invalid goal [error]'),
  T('T13', 'S3', PREVIOUS, 'finish setup / save goal'),
  T('T14', 'S3', 'S2', 'back (setup)'),
  T('T15', 'S3', 'S12', 'what are macros?'),
  T('T16', 'S12', PREVIOUS, 'got it'),
  T('T17', 'S4', 'S4', 'toggle macros panel'),
  T('T18', 'S4', 'S5', 'start a new batch'),
  T('T19', 'S4', 'S8', 'open batch card'),
  T('T20', 'S4', 'S5', 'reuse recent batch'),
  T('T21', 'S4', 'S3', 'edit goal'),
  T('T22', 'S4', 'S11', 'log other food'),
  T('T23', 'S4', 'S10', 'Summary tab'),
  T('T24', 'S4', 'S1', 'log out'),
  T('T25', 'S4', 'S12', 'macros info'),
  T('T26', 'S5', 'S5', 'change name / days / meals per day'),
  T('T27', 'S5', 'S6', 'add ingredients'),
  T('T28', 'S5', 'S5', 'remove ingredient'),
  T('T29', 'S5', 'S7', 'next'),
  T('T29b', 'S5', 'S5', 'next disabled [shows reason]'),
  T('T30', 'S5', 'S4', 'cancel'),
  T('T31', 'S6', 'S6', 'switch Search / Label tab'),
  T('T32', 'S6', 'S6', 'search'),
  T('T33', 'S6', 'S6', 'select food + grams'),
  T('T34', 'S6', 'S6', 'switch raw / cooked / dry'),
  T('T35', 'S6', 'S5', 'add N ingredients'),
  T('T36', 'S6', 'S6', 'save label food [error]'),
  T('T37', 'S6', 'S5', 'back'),
  T('T38', 'S7', 'S7', 'enter scale reading / pot [error]'),
  T('T39', 'S7', 'S7', 'pick start date / meal days [error]'),
  T('T40', 'S7', 'S7', 'toggle details'),
  T('T41', 'S7', 'S8', 'save batch'),
  T('T42', 'S7', 'S5', 'back'),
  T('T43', 'S8', 'S8', 'switch log tab'),
  T('T44', 'S8', 'S8', 'log portion'),
  T('T45', 'S8', 'S8', 'invalid portion [error]'),
  T('T46', 'S8', 'S8', 'undo'),
  T('T47', 'S8', 'S8', 'save container [error]'),
  T('T48', 'S8', 'S9', 'close batch'),
  T('T49', 'S8', PREVIOUS, 'done'),
  T('T50', 'S9', PREVIOUS, 'done'),
  T('T51', 'S10', 'S8', 'view open batch'),
  T('T52', 'S10', 'S9', 'view closed batch'),
  T('T53', 'S10', 'S3', 'edit goal'),
  T('T54', 'S10', 'S11', 'log other food'),
  T('T55', 'S10', 'S4', 'Home tab'),
  T('T56', 'S10', 'S5', 'New batch tab'),
  T('T57', 'S11', 'S11', 'switch tab / search'),
  T('T58', 'S11', 'S11', 'add food'),
  T('T59', 'S11', 'S11', 'quick add [error]'),
  T('T60', 'S11', 'S11', 'remove item'),
  T('T61', 'S11', PREVIOUS, 'done'),
];

export function findTransition(from: ScreenId, id: string): Transition | undefined {
  return TRANSITIONS.find((t) => t.from === from && t.id === id);
}
