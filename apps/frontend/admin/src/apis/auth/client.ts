import { FetchResponse } from '../_model';
import apiClient from '../_client';

import { LoginRequest, LoginResponse } from './model';

const endpoint = 'auth';

export async function login(data: LoginRequest): Promise<LoginResponse | null> {
  try {
    const response = await apiClient.post<FetchResponse<LoginResponse>>(`${endpoint}/login`, data);

    if (response && response.status === 200) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
