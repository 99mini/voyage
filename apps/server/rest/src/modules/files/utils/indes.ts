/**
 * True if the included path is relative("..")
 * @param val
 */
export const isRelativePath = (val?: string) => {
  if (!val) {
    return false;
  }
  return val.includes('..');
};
