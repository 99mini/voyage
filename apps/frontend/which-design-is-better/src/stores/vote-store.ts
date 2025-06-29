import { create } from 'zustand';

import { VoteItemResponse, VoteRequest, useSubmitVoteMutation, useVoteListQuery } from '@/apis/vote';

interface VoteState {
  voteItems: VoteItemResponse[];
  currentVote: VoteItemResponse | null;
  isLoading: boolean;
  error: string | null;

  fetchVotes: () => Promise<void>;
  setCurrentVote: (voteId: string) => void;
  castVote: (req: VoteRequest) => Promise<void>;
}

export const useVoteStore = create<VoteState>((set, get) => ({
  voteItems: [],
  currentVote: null,
  isLoading: false,
  error: null,

  fetchVotes: async () => {
    set({ isLoading: true, error: null });
    try {
      const votes = await getVoteList();
      set({ voteItems: votes, isLoading: false });
    } catch (error) {
      set({ error: '투표 목록을 불러오는데 실패했습니다.', isLoading: false });
    }
  },

  setCurrentVote: (voteId: string) => {
    const { voteItems } = get();
    const currentVote = voteItems.find((item) => item.id === voteId) || null;
    set({ currentVote });
  },

  castVote: async (req: VoteRequest) => {
    set({ isLoading: true, error: null });
    try {
      const updatedVote = await submitVote(req);

      // 상태 업데이트
      set((state) => ({
        voteItems: state.voteItems.map((item) => (item.id === updatedVote.id ? updatedVote : item)),
        currentVote: updatedVote,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: '투표하는데 실패했습니다.', isLoading: false });
    }
  },
}));
