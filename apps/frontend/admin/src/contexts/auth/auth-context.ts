import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { LoginRequest, LoginResponse, useLoginMutation } from '@/apis/auth';
import { MutateOptions } from 'react-query';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  accessTokenExpiresAt: Date | undefined;
  refreshTokenExpiresAt: Date | undefined;
  login: ({ accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt }: LoginResponse) => void;
  logout: () => void;
}

// zustand 스토어 생성
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      accessToken: undefined,
      refreshToken: undefined,
      accessTokenExpiresAt: undefined,
      refreshTokenExpiresAt: undefined,
      login: ({ accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt }: LoginResponse) => {
        set({ isAuthenticated: true, accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt });
      },
      logout: () => {
        set({
          isAuthenticated: false,
          accessToken: undefined,
          refreshToken: undefined,
          accessTokenExpiresAt: undefined,
          refreshTokenExpiresAt: undefined,
        });
      },
    }),
    {
      name: 'auth-storage', // 로컬 스토리지에 저장될 키 이름
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }), // 저장할 상태 선택
    },
  ),
);

// 편의를 위한 훅 (기존 코드와의 호환성 유지)
export function useAuth() {
  const { isAuthenticated, login: loginStore, logout: logoutStore } = useAuthStore();
  const { mutate: loginMutate } = useLoginMutation();

  const login = async (
    data: LoginRequest,
    options?: MutateOptions<LoginResponse | null, unknown, LoginRequest, unknown>,
  ) => {
    const { onSuccess, ...restOptions } = options ?? {};

    loginMutate(data, {
      onSuccess: (data, variables, context) => {
        if (data) {
          loginStore(data);
        }
        onSuccess?.(data, variables, context);
      },
      ...restOptions,
    });
  };

  const logout = async () => {
    logoutStore();
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
}
