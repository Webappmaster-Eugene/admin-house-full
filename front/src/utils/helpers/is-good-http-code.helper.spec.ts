import { isGoodHttpCode } from './is-good-http-code.helper';

describe('isGoodHttpCode', () => {
  it('should return true for 200 OK', () => {
    expect(isGoodHttpCode(200)).toBe(true);
  });

  it('should return true for 201 Created', () => {
    expect(isGoodHttpCode(201)).toBe(true);
  });

  it('should return false for 4xx client errors and 5xx server errors', () => {
    expect(isGoodHttpCode(400)).toBe(false);
    expect(isGoodHttpCode(401)).toBe(false);
    expect(isGoodHttpCode(403)).toBe(false);
    expect(isGoodHttpCode(404)).toBe(false);
    expect(isGoodHttpCode(500)).toBe(false);
  });
});
