import { isSafePath } from '.';

describe('isSafePath', () => {
  test('should return true for valid paths', () => {
    const basePath = '/mnt/volume_sgp1_01/static';
    const validPath = 'uploads/test.txt';
    const invalidPath = '../uploads/test.txt';

    expect(isSafePath(basePath, validPath)).toBe(true);
    expect(isSafePath(basePath, invalidPath)).toBe(false);
  });

  test('should return false for paths outside base path', () => {
    const basePath = '/mnt/volume_sgp1_01/static';
    const outsidePath = '/mnt/volume_sgp1_01/uploads/test.txt';

    expect(isSafePath(basePath, outsidePath)).toBe(false);
  });

  test('should return false for paths with invalid characters', () => {
    const basePath = '/mnt/volume_sgp1_01/static';
    const invalidPath = 'uploads/../test.txt';

    expect(isSafePath(basePath, invalidPath)).toBe(false);
  });

  test('should return true for paths is empty', () => {
    const basePath = '/mnt/volume_sgp1_01/static';
    const emptyPath = '';

    expect(isSafePath(basePath, emptyPath)).toBe(true);
  });
});
