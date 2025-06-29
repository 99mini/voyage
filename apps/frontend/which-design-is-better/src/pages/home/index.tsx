import { Link } from 'react-router';

import { ROUTE_PATH } from '@/lib/constants/url';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Which Design is Better?</h1>
        <p className="text-lg text-gray-600">두 가지 디자인 중 더 나은 디자인에 투표해보세요!</p>
        <Link to={ROUTE_PATH.VOTE} className="text-blue-500 hover:underline">
          투표하기
        </Link>
      </div>
    </div>
  );
}
