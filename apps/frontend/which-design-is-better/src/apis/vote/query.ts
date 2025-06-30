import { UseMutationResult, UseQueryResult, useMutation, useQuery } from 'react-query';

import { getPopularVoteList, getVote, getVoteList, getVoteMetaList, submitVote } from './client';
import type { SubmitVoteRequest, VoteItemResponse, VoteMetaResponse } from './model';

const ONE_HOUR = 60 * 60 * 1000;

export function usePopularVoteListQuery(): UseQueryResult<VoteItemResponse[]> {
  return useQuery({
    queryKey: ['popular-vote-list'],
    queryFn: () => getPopularVoteList(),
    refetchOnWindowFocus: false,
  });
}

export function useVoteMetaQuery(): UseMutationResult<VoteMetaResponse[]> {
  return useMutation({
    mutationFn: () => getVoteMetaList(),
  });
}

export function useVoteQuery(): UseMutationResult<VoteItemResponse | undefined, unknown, string, unknown> {
  return useMutation({
    mutationFn: (id: string) => getVote(id),
  });
}

export function useVoteMetaListQuery(): UseQueryResult<VoteMetaResponse[]> {
  return useQuery({
    queryKey: ['vote-meta-list'],
    queryFn: () => getVoteMetaList(),
    refetchOnWindowFocus: false,
    staleTime: ONE_HOUR,
    cacheTime: ONE_HOUR,
  });
}

export function useVoteListQuery(): UseQueryResult<VoteItemResponse[]> {
  return useQuery({
    queryKey: ['vote-list'],
    queryFn: () => getVoteList(),
    refetchOnWindowFocus: false,
  });
}

export function useSubmitVoteMutation(): UseMutationResult<VoteItemResponse, unknown, SubmitVoteRequest, unknown> {
  return useMutation({
    mutationFn: submitVote,
  });
}
