import { findMod } from './util';

const MODULI = [1000000007, 1000000009, 998244353, 10007, 163577857];

describe('findMod', () => {
  test('Should not detect mod for empty string', () => {
    expect(findMod('')).toBeNull();
  });
  test('Should understand comma-separated notation', () => {
    expect(findMod('1,000,000,007')).toBe(1000000007);
  });
  test('Should understand exponential notation', () => {
    expect(findMod('10^9+7')).toBe(1000000007);
    expect(findMod('10^9 + 7')).toBe(1000000007);
  });
  test('Should not detect mod for a number expression containing default mod as a part', () => {
    MODULI.forEach((mod) => {
      const modStr = String(mod);
      expect(findMod(modStr)).toBe(mod);
      expect(findMod(' ' + modStr)).toBe(mod);
      expect(findMod('a' + modStr)).toBe(mod);
      expect(findMod('1' + modStr)).toBeNull();
      expect(findMod(modStr + ' ')).toBe(mod);
      expect(findMod(modStr + 'a')).toBe(mod);
      expect(findMod(modStr + '0')).toBeNull();
    });
  });
});
