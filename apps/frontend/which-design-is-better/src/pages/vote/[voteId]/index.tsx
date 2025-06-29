import { useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router';

import { VoteCard } from '@/components/features';
import { Spinner } from '@/components/feedback';

import { ROUTE_PATH } from '@/lib/constants/url';
import { useVoteStore } from '@/stores/vote-store';

export default function VoteDetail() {
  const { voteId } = useParams<{ voteId: string }>();
  const navigate = useNavigate();

  const { currentVote, isLoading, error, fetchVote } = useVoteStore();

  const nextVoteId = currentVote?.nextVoteId;

  useEffect(() => {
    if (!voteId) {
      navigate('/404.html');
      return;
    }
    fetchVote(voteId);
  }, [voteId, fetchVote]);

  if (!currentVote || !voteId) {
    navigate('/404.html');
    return null;
  }

  if (isLoading || !currentVote) {
    return (
      <div className="flex justify-center items-center h-80">
        {error ? <div className="text-red-500">{error}</div> : <Spinner />}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <VoteCard voteItem={currentVote} key={currentVote.id} />
      <div className="text-center mt-4">
        {nextVoteId ? (
          <Link to={ROUTE_PATH.VOTE_DETAIL.replace(':voteId', nextVoteId)} className="text-sm text-gray-500 underline">
            다음 투표로 넘어가기
          </Link>
        ) : (
          <Link to={ROUTE_PATH.ROOT} className="text-sm text-gray-500 underline">
            홈으로 돌아가기
          </Link>
        )}
      </div>
    </div>
  );
}
