import { FetchResponse } from '../_model';
import apiClient from '../_client';

import { ReadFilesRequest, ReadFilesResponse } from './model';

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
