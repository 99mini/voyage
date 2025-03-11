import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { Button, Input, Card, CardHeader, CardTitle, CardContent, CardFooter } from '@packages/vds';

import { useAuth } from '@/contexts/auth/auth-context';

import { PROTECTED_PATH } from '@/lib/route-constants';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username && password) {
      await login(
        {
          email: username,
          password,
        },
        {
          onSuccess: () => {
            navigate(PROTECTED_PATH.DASHBOARD);
          },
        },
      );
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PROTECTED_PATH.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

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
