import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// zustand 스토어 생성
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (token: string) => {
        set({ isAuthenticated: true });
      },
      logout: () => {
        set({ isAuthenticated: false });
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
  return useAuthStore();
}
