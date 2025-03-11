import { useMutation } from 'react-query';

import { login } from './client';
import { LoginRequest } from './model';

export const useLoginMutation = () =>
  useMutation({
    mutationKey: ['login'],
    mutationFn: (data: LoginRequest) => login(data),
  });
