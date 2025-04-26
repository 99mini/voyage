import { isSafePath } from '.';

describe('isSafePath', () => {
  const basePath = '/mnt/volume_sgp1_01/static';

  test('should return true for valid paths', () => {
    const validPath = 'uploads/test.txt';

    expect(isSafePath(basePath, validPath)).toBe(true);
  });

  test('should return false for paths outside base path', () => {
    const outsidePath = '/mnt/volume_sgp1_01/uploads/test.txt';

    expect(isSafePath(basePath, outsidePath)).toBe(false);
  });

  test('should return false for paths with invalid characters', () => {
    const invalidPath = 'uploads/../test.txt';

    expect(isSafePath(basePath, invalidPath)).toBe(false);
  });

  test('should return true for paths is empty or undefined', () => {
    const emptyPath = '';

    expect(isSafePath(basePath, emptyPath)).toBe(true);
    expect(isSafePath(basePath)).toBe(true);
  });
});
