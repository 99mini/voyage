import { useMutation, useQuery } from 'react-query';

import { getPopularVoteList, getVote, getVoteList, submitVote } from './client';

const ONE_HOUR = 60 * 60 * 1000;

export function usePopularVoteListQuery() {
  return useQuery({
    queryKey: ['popular-vote-list'],
    queryFn: () => getPopularVoteList(),
    refetchOnWindowFocus: false,
    staleTime: 6 * ONE_HOUR,
    cacheTime: 6 * ONE_HOUR,
  });
}

export function useVoteQuery() {
  return useMutation({
    mutationFn: (id: string) => getVote(id),
  });
}

export function useVoteListQuery() {
  return useQuery({
    queryKey: ['vote-list'],
    queryFn: () => getVoteList(),
    refetchOnWindowFocus: false,
    staleTime: ONE_HOUR,
    cacheTime: ONE_HOUR,
  });
}

export function useSubmitVoteMutation() {
  return useMutation({
    mutationFn: submitVote,
  });
}
