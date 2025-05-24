import apiClient from '../_client';
import { FetchResponse } from '../_model';
import { ReadFileResponse, UploadFileResponse } from './model';

const endpoint = 'files';

export async function uploadFile(file: File): Promise<UploadFileResponse | null> {
  try {
    const formData = new FormData();

    formData.append('path', 'coloring/result');
    formData.append('file', file);

    const response = await apiClient.post<FetchResponse<UploadFileResponse>>(endpoint, formData, {
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
}

export async function readSourceFile(): Promise<ReadFileResponse[] | null> {
  try {
    const response = await apiClient.get<FetchResponse<ReadFileResponse[]>>(endpoint, [['path', 'coloring/src']], {
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
}

export async function readResultFile(): Promise<ReadFileResponse[] | null> {
  try {
    const response = await apiClient.get<FetchResponse<ReadFileResponse[]>>(endpoint, [['path', 'coloring/result']], {
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
}
