import { FetchResponse } from '../_model';
import apiClient from '../_client';

import {
  ReadFilesRequest,
  ReadFilesResponse,
  UploadFilesRequest,
  UploadFilesResponse,
  UpdateFilesRequest,
  UpdateFilesResponse,
  DeleteFilesResponse,
  DeleteFilesRequest,
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

export const uploadFile = async (req: UploadFilesRequest) => {
  try {
    const response = await apiClient.post<FetchResponse<UploadFilesResponse>>(`${endpoint}`, req, {
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

export const updateFile = async (req: UpdateFilesRequest) => {
  try {
    const response = await apiClient.put<FetchResponse<UpdateFilesResponse>>(`${endpoint}`, req, {
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
