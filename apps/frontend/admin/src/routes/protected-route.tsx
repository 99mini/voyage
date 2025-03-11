import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/contexts/AuthContext';

import { PUBLIC_PATH } from '@/lib/route-constants';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // 인증되지 않은 사용자는 로그인 페이지로 리다이렉션
    return <Navigate to={PUBLIC_PATH.LOGIN} replace />;
  }

  // 인증된 사용자는 자식 라우트를 렌더링
  return <Outlet />;
};

export default ProtectedRoute;
