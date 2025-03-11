import { Button } from '@packages/vds';
import { useAuth } from '@/contexts/auth/auth-context';
import { PUBLIC_PATH } from '@/lib/route-constants';
import { useNavigate } from 'react-router';

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(PUBLIC_PATH.LOGIN);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">대시보드</h1>
        <Button variant="outline" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">사용자 통계</h2>
          <p className="text-gray-600">Protected 라우트에 성공적으로 접근했습니다.</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">최근 활동</h2>
          <p className="text-gray-600">이 페이지는 인증된 사용자만 볼 수 있습니다.</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">시스템 상태</h2>
          <p className="text-gray-600">모든 시스템이 정상 작동 중입니다.</p>
        </div>
      </div>
    </div>
  );
}
