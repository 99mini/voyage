import { useEffect } from 'react';

import { VoteCard } from '@/components/vote-card/vote-card';

import { useVoteStore } from '@/stores/vote-store';

export default function Home() {
  const { voteItems, isLoading, error, fetchVotes } = useVoteStore();

  useEffect(() => {
    fetchVotes();
  }, [fetchVotes]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Which Design is Better?</h1>
        <p className="text-lg text-gray-600">두 가지 디자인 중 더 나은 디자인에 투표해보세요!</p>
      </div>

      {isLoading && (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-2">불러오는 중...</p>
        </div>
      )}

      {error && <div className="text-center py-10 text-red-500">{error}</div>}

      {voteItems.map((item) => (
        <VoteCard key={item.id} voteItem={item} />
      ))}
    </div>
  );
}
