import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Input, Card, CardHeader, CardTitle, CardContent, CardFooter } from '@packages/vds';
import { useAuth } from '@/contexts/AuthContext';
import { PROTECTED_PATH } from '@/lib/route-constants';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 실제 구현에서는 API 호출로 대체해야 합니다
    // 여기서는 간단한 예시로 로그인 성공 시뮬레이션
    if (username && password) {
      // 임시 토큰 생성 (실제 구현에서는 서버에서 받은 토큰 사용)
      const mockToken = 'mock-jwt-token';
      login(mockToken);
      navigate(PROTECTED_PATH.DASHBOARD);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">로그인</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  아이디
                </label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  비밀번호
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <CardFooter className="px-0 pt-4">
              <Button type="submit" className="w-full">
                로그인
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
