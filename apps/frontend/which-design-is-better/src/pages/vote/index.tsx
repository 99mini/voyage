import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { ROUTE_PATH } from '@/lib/constants/url';
import { useVoteStore } from '@/stores/vote-store';

export default function Vote() {
  const navigate = useNavigate();

  const { voteItems, fetchVotes } = useVoteStore();

  const voteId = voteItems[0]?.id;

  useEffect(() => {
    if (voteItems.length === 0) {
      fetchVotes();
    }
  }, [voteItems.length, fetchVotes]);

  if (!voteId) {
    navigate(ROUTE_PATH.ROOT);
    return null;
  } else {
    navigate(ROUTE_PATH.VOTE_DETAIL.replace(':voteId', voteId));
    return null;
  }
}
