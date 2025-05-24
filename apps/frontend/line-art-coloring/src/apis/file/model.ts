export interface ReadFileResponse {
  path: string;
  name: string;
  birthtimeMs: number;
  ctimeMs: number;
  mtimeMs: number;
  size: number;
}

export interface UploadFileResponse {
  filePath: string;
  publicUrl: string;
}
