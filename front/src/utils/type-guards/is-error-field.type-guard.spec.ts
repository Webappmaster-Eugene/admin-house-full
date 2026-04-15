import { isErrorFieldTypeGuard } from './is-error-field.type-guard';

describe('isErrorFieldTypeGuard', () => {
  it('should return true for objects with "error" field', () => {
    expect(isErrorFieldTypeGuard({ error: 'Something failed' })).toBe(true);
    expect(isErrorFieldTypeGuard({ error: null })).toBe(true);
    expect(
      isErrorFieldTypeGuard({ error: { name: 'NotFound', description: 'Missing' } })
    ).toBe(true);
  });

  it('should return false for successful data objects without error field', () => {
    expect(isErrorFieldTypeGuard({ uuid: '123', name: 'Project X' })).toBe(false);
    expect(isErrorFieldTypeGuard([])).toBe(false);
    expect(isErrorFieldTypeGuard({})).toBe(false);
  });

  it('should return false for null, undefined and primitive values', () => {
    expect(isErrorFieldTypeGuard(null)).toBe(false);
    expect(isErrorFieldTypeGuard(undefined)).toBe(false);
    expect(isErrorFieldTypeGuard('string')).toBe(false);
    expect(isErrorFieldTypeGuard(42)).toBe(false);
    expect(isErrorFieldTypeGuard(true)).toBe(false);
  });
});
