import { useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';

import {
  SubmitVoteRequest,
  VoteItemResponse,
  VoteMetaResponse,
  VoteResultResponse,
  useSubmitVoteMutation,
  useVoteListQuery,
  useVoteMetaQuery,
  useVoteQuery,
  useVoteResultQuery,
} from '@/apis/vote';

export const useVoteStore = () => {
  const queryClient = useQueryClient();
  const { data: voteItems = [], isLoading, error, refetch: fetchVotes } = useVoteListQuery();

  const { mutateAsync: fetchVoteDetail } = useVoteQuery();
  const { mutateAsync: fetchVoteMetaDetail } = useVoteMetaQuery();
  const { mutateAsync: fetchVoteResultDetail } = useVoteResultQuery();

  const submitVoteMutation = useSubmitVoteMutation();

  const [currentVoteMeta, setCurrentVoteMetaState] = useState<VoteMetaResponse | null>(null);
  const [currentVoteResult, setCurrentVoteResultState] = useState<VoteResultResponse | null>(null);
  const currentVote =
    currentVoteMeta && currentVoteResult
      ? {
          ...currentVoteMeta,
          ...currentVoteResult,
        }
      : null;

  const setCurrentVote = useCallback(
    (voteId: string) => {
      const vote = voteItems.find((item) => item.id === voteId) || null;

      if (!vote) {
        return false;
      }

      const voteMeta = {
        id: vote.id,
        title: vote.title,
        description: vote.description,
        optionA: vote.optionA,
        optionB: vote.optionB,
      };

      const voteResult = {
        id: vote.id,
        votesA: vote.votesA,
        votesB: vote.votesB,
        totalVotes: vote.totalVotes,
        hasVoted: vote.hasVoted,
        nextVoteId: vote.nextVoteId,
      };

      setCurrentVoteMetaState(voteMeta);
      setCurrentVoteResultState(voteResult);

      return true;
    },
    [voteItems, setCurrentVoteMetaState, setCurrentVoteResultState],
  );

  const fetchVote = useCallback(
    async (voteId: string) => {
      let vote: VoteItemResponse | undefined = voteItems.find((item) => item.id === voteId);

      if (!vote) {
        vote = await fetchVoteDetail(voteId);
      }

      if (!vote) {
        return false;
      }

      const voteMeta = {
        id: vote.id,
        title: vote.title,
        description: vote.description,
        optionA: vote.optionA,
        optionB: vote.optionB,
      };

      const voteResult = {
        id: vote.id,
        votesA: vote.votesA,
        votesB: vote.votesB,
        totalVotes: vote.totalVotes,
        hasVoted: vote.hasVoted,
        nextVoteId: vote.nextVoteId,
      };

      setCurrentVoteMetaState(voteMeta);
      setCurrentVoteResultState(voteResult);

      return true;
    },
    [voteItems, setCurrentVoteMetaState, setCurrentVoteResultState],
  );

  const fetchVoteMeta = useCallback(
    async (voteId: string) => {
      let voteMeta: VoteMetaResponse | undefined = voteItems.find((item) => item.id === voteId);

      if (!voteMeta) {
        voteMeta = await fetchVoteMetaDetail(voteId);
      }

      if (!voteMeta) {
        return false;
      }

      setCurrentVoteMetaState(voteMeta);

      return true;
    },
    [voteItems, setCurrentVoteMetaState],
  );

  const fetchVoteResult = useCallback(
    async (voteId: string) => {
      let voteResult: VoteResultResponse | undefined = voteItems.find((item) => item.id === voteId);

      if (!voteResult) {
        voteResult = await fetchVoteResultDetail(voteId);
      }

      if (!voteResult) {
        return false;
      }

      setCurrentVoteResultState(voteResult);

      return true;
    },
    [voteItems, setCurrentVoteResultState],
  );

  const castVote = useCallback(
    async (req: SubmitVoteRequest) => {
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
    fetchVote,
    fetchVoteMeta,
    fetchVoteResult,
  };
};
