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
  birthtimeMs: number;
  ctimeMs: number;
  mtimeMs: number;
  size: number | null;
  mode: number;
};

export type UpdateFilesRequest = {
  path: string;
  filename: string;
  newPath?: string;
  newFilename?: string;
};

export type UpdateFilesResponse = {
  path: string;
  filename: string;
};

export type UploadFilesRequest = {
  path: string;
  file: File;
};

export type CreateDirectoryRequest = {
  path: string;
};

export type CreateDirectoryResponse = {
  path: string;
};

export type UploadFilesResponse = {
  filePath: string;
  publicUrl: string;
};

export type DeleteFilesRequest = {
  path: string;
};

export type DeleteFilesResponse = {
  path: string;
};
