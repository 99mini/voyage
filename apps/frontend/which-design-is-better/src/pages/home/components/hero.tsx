import { Link } from 'react-router';

import { usePopularVoteListQuery } from '@/apis/vote';

import { ROUTE_PATH } from '@/lib/constants/url';

/**
 * Hero section on home page showing the most popular vote results.
 */
export default function Hero() {
  const { data: popularVotes = [], isLoading } = usePopularVoteListQuery();

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-center mb-6">🔥 인기 투표 결과</h2>

      {isLoading && (
        <div className="flex justify-center py-10">
          <span className="animate-spin w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full" />
        </div>
      )}

      {!isLoading && popularVotes.length === 0 && (
        <p className="text-center text-gray-500">아직 투표 결과가 없습니다.</p>
      )}

      {!isLoading && popularVotes.length > 0 && (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {popularVotes.map((vote) => (
            <li key={vote.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold truncate mb-2">{vote.title}</h3>
              <p className="text-sm text-gray-500 mb-4">총 {vote.totalVotes.toLocaleString()}표</p>

              <Link
                to={ROUTE_PATH.VOTE_DETAIL.replace(':voteId', vote.id)}
                className="inline-block px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                투표하고 결과 보기
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
