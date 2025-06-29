import { useMutation, useQuery } from 'react-query';

import { getVote, getVoteList, submitVote } from './client';

export function useVoteQuery() {
  return useMutation({
    mutationFn: (id: string) => getVote(id),
  });
}

export function useVoteListQuery() {
  return useQuery({
    queryKey: ['vote-list'],
    queryFn: () => getVoteList(),
  });
}

export function useSubmitVoteMutation() {
  return useMutation({
    mutationFn: submitVote,
  });
}
