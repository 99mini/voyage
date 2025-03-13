import { useMutation, useQuery } from 'react-query';

import { createDirectory, deleteFile, readFiles, updateFile, uploadFile } from './client';
import {
  CreateDirectoryRequest,
  DeleteFilesRequest,
  ReadFilesRequest,
  UpdateFilesRequest,
  UploadFilesRequest,
} from './model';

export const useFilesQuery = (data: ReadFilesRequest) =>
  useQuery({
    queryKey: ['files', data.path ?? ''],
    queryFn: () => readFiles(data),
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });

export const useDeleteFileMutation = () =>
  useMutation({
    mutationKey: 'delete-file',
    mutationFn: (data: DeleteFilesRequest) => deleteFile(data),
  });

export const useUpdateFileMutation = () =>
  useMutation({
    mutationKey: 'update-file',
    mutationFn: (data: UpdateFilesRequest) => updateFile(data),
  });

export const useUploadFileMutation = (path: string) =>
  useMutation({
    mutationKey: ['upload-file', path],
    mutationFn: (file: UploadFilesRequest['file']) => uploadFile({ path, file }),
  });

export const useCreateDirectoryMutation = () =>
  useMutation({
    mutationKey: 'create-directory',
    mutationFn: (data: CreateDirectoryRequest) => createDirectory(data),
  });
