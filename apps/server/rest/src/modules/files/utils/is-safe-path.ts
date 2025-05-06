import path from 'path';

/**
 * Checks if the target path is safe by ensuring it does not contain any relative path components.
 * @param basePath The base path to check against.
 * @param targetPath The target path to check.
 * @returns True if the target path is safe, false otherwise.
 */
export const isSafePath = (basePath: string, targetPath?: string): boolean => {
  if (!targetPath) {
    return true;
  }

  let encodedPath: string;
  try {
    encodedPath = decodeURIComponent(targetPath);
  } catch (error) {
    return false; // Malformed URI sequence, path is not safe
  }
  const relativePathRegex = /(\.\.\/|\.\.\\|\/\.\.|\\\.\.)/;

  if (relativePathRegex.test(encodedPath)) {
    return false;
  }
  const normalized = path.normalize(encodedPath);
  const resolved = path.resolve(basePath, normalized);

  const relative = path.relative(basePath, resolved);
  return !relative.startsWith('..') && !path.isAbsolute(relative);
};
