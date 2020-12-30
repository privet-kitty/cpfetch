import { findMod } from './util';

describe('findMod', () => {
  test('empty case', () => {
    expect(findMod('')).toBeNull();
  });
});
