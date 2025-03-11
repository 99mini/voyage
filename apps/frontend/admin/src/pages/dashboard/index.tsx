import { useNavigate } from 'react-router';

import { Button, Grid, GridItem } from '@packages/vds';

import { useAuth } from '@/contexts/auth/auth-context';

import HealthCheck from './components/health';

import { PUBLIC_PATH } from '@/lib/constants/route.constant';

const Dashboard = () => {
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

      <Grid column={2}>
        <GridItem>
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">시스템 상태</h2>
            <HealthCheck />
          </div>
        </GridItem>

        <GridItem>
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">사용자 통계</h2>
            <p className="text-gray-600">Protected 라우트에 성공적으로 접근했습니다.</p>
          </div>
        </GridItem>

        <GridItem>
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">최근 활동</h2>
            <p className="text-gray-600">이 페이지는 인증된 사용자만 볼 수 있습니다.</p>
          </div>
        </GridItem>
      </Grid>
    </div>
  );
};

export default Dashboard;
