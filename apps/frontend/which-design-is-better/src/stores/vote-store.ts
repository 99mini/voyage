import { useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';

import { VoteItemResponse, VoteRequest, useSubmitVoteMutation, useVoteListQuery, useVoteQuery } from '@/apis/vote';

export const useVoteStore = () => {
  const queryClient = useQueryClient();
  const { data: voteItems = [], isLoading, error, refetch: fetchVotes } = useVoteListQuery();
  const submitVoteMutation = useSubmitVoteMutation();

  // 현재 선택된 투표 항목 상태
  const [currentVote, setCurrentVoteState] = useState<VoteItemResponse | null>(null);

  // 현재 투표 항목 설정
  const setCurrentVote = useCallback(
    (voteId: string) => {
      const vote = voteItems.find((item) => item.id === voteId) || null;
      setCurrentVoteState(vote);
    },
    [voteItems],
  );

  const castVote = useCallback(
    async (req: VoteRequest) => {
      try {
        await submitVoteMutation.mutateAsync(req);

        queryClient.invalidateQueries(['vote-list']);

        queryClient.invalidateQueries(['vote', req.voteId]);
      } catch (error) {
        console.error('투표 제출 실패:', error);
        throw error;
      }
    },
    [submitVoteMutation, queryClient],
  );

  return {
    voteItems,
    currentVote,
    isLoading: isLoading || submitVoteMutation.isLoading,
    error: error
      ? '투표 목록을 불러오는데 실패했습니다.'
      : submitVoteMutation.error
        ? '투표하는데 실패했습니다.'
        : null,
    setCurrentVote,
    castVote,
    fetchVotes,
  };
};
