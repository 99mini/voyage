import { Link, useNavigate } from 'react-router';

import { ChevronRight } from 'lucide-react';

import { Button, Grid, GridItem } from '@packages/vds';

import { useAuth } from '@/contexts/auth/auth-context';

import { PROTECTED_PATH, PUBLIC_PATH } from '@/lib/constants/route.constant';

import HealthCheck from './components/health';

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

      <Grid gap={12} column={1} className="grid-cols-1 sm:grid-cols-2">
        <GridItem>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">시스템 상태</h2>
            <HealthCheck />
          </div>
        </GridItem>

        <GridItem>
          <Link to={PROTECTED_PATH.FILE} className="cursor-pointer">
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
              <div className="flex items-center mb-2 hover:underline">
                <h2 className="text-xl font-semibold">파일 관리</h2>
                <ChevronRight className="w-6 h-6" />
              </div>
              <p className="text-gray-600">Digital Oceans Volume에 업로드된 파일을 관리합니다.</p>
            </div>
          </Link>
        </GridItem>

        <GridItem>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">최근 활동</h2>
            <p className="text-gray-600">이 페이지는 인증된 사용자만 볼 수 있습니다.</p>
          </div>
        </GridItem>
      </Grid>
    </div>
  );
};

export default Dashboard;
