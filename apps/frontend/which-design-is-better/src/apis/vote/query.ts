import { useMutation, useQuery } from 'react-query';

import { getVote, getVoteList, submitVote } from './client';

export function useVoteQuery(id: string) {
  return useQuery({
    queryKey: ['vote', id],
    queryFn: () => getVote(id),
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
