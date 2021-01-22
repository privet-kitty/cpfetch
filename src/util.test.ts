import { TestCases } from './types';
import { deleteDuplicateTestCases, findMod } from './util';

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
    expect(findMod('109+7')).toBe(1000000007);
    expect(findMod('10^9+9')).toBe(1000000009);
    expect(findMod('10^9 + 9')).toBe(1000000009);
    expect(findMod('109+9')).toBe(1000000009);
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
  test('Should return null when multiple moduli are detected', () => {
    expect(findMod('10^9+7 998244353')).toBeNull();
  });
  test('Should return mod when duplicate moduli are detected', () => {
    expect(findMod('998244353 998244353')).toBe(998244353);
    expect(findMod('998244353998244353')).toBe(998244353);
  });
});

describe('deleteDuplicateTestCases', () => {
  test('empty case', () => {
    expect(deleteDuplicateTestCases([])).toStrictEqual([]);
  });
  test('non duplicate case', () => {
    const testCases: TestCases = [
      ['in1', 'out1'],
      ['in2', 'out2'],
      ['in3', 'out3'],
    ];
    expect(deleteDuplicateTestCases(testCases)).toStrictEqual(testCases);
  });
  test('duplicate case', () => {
    const testCases: TestCases = [
      ['in1', 'out1'],
      ['in2', 'out2'],
      ['in1', 'out1'],
      ['in1', 'out1'],
    ];
    expect(deleteDuplicateTestCases(testCases)).toStrictEqual([
      ['in1', 'out1'],
      ['in2', 'out2'],
    ]);
  });
});
