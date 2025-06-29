import { Link } from 'react-router';

import { ROUTE_PATH } from '@/lib/constants/url';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 select-none">
          404
        </h1>
        <p className="mt-6 text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100">
          페이지를 찾을 수 없습니다
        </p>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          존재하지 않는 주소이거나 <br /> 이동 혹은 삭제되었을 수 있어요.
        </p>

        <Link
          to={ROUTE_PATH.ROOT}
          className="inline-block mt-8 px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
