import apiClient from '../_client';
import { FetchResponse } from '../_model';
import {
  CreateDirectoryRequest,
  CreateDirectoryResponse,
  DeleteFilesRequest,
  DeleteFilesResponse,
  ReadFilesRequest,
  ReadFilesResponse,
  UpdateFilesRequest,
  UpdateFilesResponse,
  UploadFilesRequest,
  UploadFilesResponse,
} from './model';

const endpoint = 'files';

export const readFiles = async (req: ReadFilesRequest = {}) => {
  try {
    const query = req.path ? { path: req.path } : undefined;
    const response = await apiClient.get<FetchResponse<ReadFilesResponse[]>>(`${endpoint}`, query, {
      headers: {
        'x-api-key': import.meta.env.VITE_VOYAGE_API_KEY ?? '',
      },
    });

    if (response && response.status === 200) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// TODO: form data 형식 맞추기
export const uploadFile = async (req: UploadFilesRequest) => {
  try {
    const formData = new FormData();

    const { path, file } = req;

    formData.append('path', path);
    formData.append('file', file);

    const response = await apiClient.post<FetchResponse<UploadFilesResponse>>(`${endpoint}`, formData, {
      headers: {
        'x-api-key': import.meta.env.VITE_VOYAGE_API_KEY ?? '',
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response && response.status === 200) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateFile = async (req: UpdateFilesRequest) => {
  try {
    const response = await apiClient.put<FetchResponse<UpdateFilesResponse>>(`${endpoint}`, JSON.stringify(req), {
      headers: {
        'x-api-key': import.meta.env.VITE_VOYAGE_API_KEY ?? '',
      },
    });

    if (response && response.status === 200) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteFile = async (req: DeleteFilesRequest) => {
  try {
    const response = await apiClient.delete<FetchResponse<DeleteFilesResponse>>(`${endpoint}`, req, {
      headers: {
        'x-api-key': import.meta.env.VITE_VOYAGE_API_KEY ?? '',
      },
    });

    if (response && response.status === 200) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createDirectory = async (req: CreateDirectoryRequest) => {
  try {
    const response = await apiClient.post<FetchResponse<CreateDirectoryResponse>>(
      `${endpoint}/directory`,
      JSON.stringify(req),
      {
        headers: {
          'x-api-key': import.meta.env.VITE_VOYAGE_API_KEY ?? '',
          'Content-Type': 'application/json',
        },
      },
    );

    if (response && response.status === 200) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
