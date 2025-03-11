export type ReadFilesRequest = {
  path?: string;
};

export type ReadFilesResponse = {
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
};
