import { pluralize } from './pluralize.helper';

const FORMS: [string, string, string] = ['смета', 'сметы', 'смет'];

describe('pluralize', () => {
  it.each([
    [0, '0 смет'],
    [1, '1 смета'],
    [2, '2 сметы'],
    [4, '4 сметы'],
    [5, '5 смет'],
    [11, '11 смет'],
    [12, '12 смет'],
    [14, '14 смет'],
    [21, '21 смета'],
    [22, '22 сметы'],
    [111, '111 смет'],
    [101, '101 смета'],
  ])('%i → %s', (count, expected) => {
    expect(pluralize(count, FORMS)).toBe(expected);
  });
});
