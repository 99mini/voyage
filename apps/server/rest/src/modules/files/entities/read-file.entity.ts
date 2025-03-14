export class ReadFileEntity {
  name: string;
  parentPath: string;
  path: string;
  isFile: boolean;
  isDirectory: boolean;
  isBlockDevice: boolean;
  isCharacterDevice: boolean;
  isSymbolicLink: boolean;
  isFIFO: boolean;
  isSocket: boolean;
  birthtimeMs: number;
  ctimeMs: number;
  mtimeMs: number;
  /** byte */
  size: number | null;
  mode: number;
}
