import { normalize, resolve } from 'path';

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

  const relativePathRegex = /(\.\.\/|\.\.\\|\/\.\.|\\\.\.)/;

  if (relativePathRegex.test(targetPath)) {
    return false;
  }

  const normalized = normalize(targetPath);
  const resolved = resolve(basePath, normalized);

  return resolved.startsWith(basePath);
};
