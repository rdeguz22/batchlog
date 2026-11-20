// Requirements from the spec that still need code. When you build one, move its test into
// the matching file and delete the line here. `npm test` lists these as "todo".
import { describe, it } from 'vitest';

describe('still to build', () => {
  it.todo('F3 createAccount() stores the account');
  it.todo('F4 validateAuth() returns the right message for all five cases');
  it.todo('F6 saveProfile() stores values and accepts blanks');
  it.todo('D8 passwords are stored only as a SHA-256 hash');
  it.todo('F18 copyBatch() returns a draft with matching fields');
  it.todo('F25 removeIngredient() then batchTotals() drops by that item');
  it.todo('F32 addSelected() adds valid items and rejects missing grams');
  it.todo('F48 saveContainer() validates name, empty > 0, full > empty');
  it.todo('D2 createBatch() returns an object with every field');
  it.todo('F52 / D6 dailyTotals() counts only today, by local date');
  it.todo('F54 logOther() adds to dailyTotals()');
  it.todo('F55 quickAdd() requires a name and calories above 0');
  it.todo('F56 removeLog() lowers dailyTotals()');
  it.todo('F59 weeklyTotals() with a mocked clock');
  it.todo('D7 recents show +500 g after adding 500 g penne');
});
