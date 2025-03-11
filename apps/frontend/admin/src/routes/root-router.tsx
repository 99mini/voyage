import { BrowserRouter, Route, Routes } from 'react-router';

import { Toaster } from '@packages/vds';

import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import ProtectedRoute from '@/routes/protected-route';

import Home from '@/pages';
import Login from '@/pages/login';
import Dashboard from '@/pages/dashboard';

import { AuthProvider } from '@/contexts/AuthContext';

import { PUBLIC_PATH, PROTECTED_PATH } from '@/lib/route-constants';

function RootRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="container mx-auto p-4 md:px-0 flex-grow">
            <Routes>
              {/* 공개 라우트 */}
              <Route path={PUBLIC_PATH.ROOT} element={<Home />} />
              <Route path={PUBLIC_PATH.LOGIN} element={<Login />} />

              {/* 보호된 라우트 */}
              <Route element={<ProtectedRoute />}>
                <Route path={PROTECTED_PATH.DASHBOARD} element={<Dashboard />} />
              </Route>
            </Routes>
            <Toaster />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default RootRouter;
