import { DesignOptionType } from '@/lib/types';

export interface DesignOptionSchema extends DesignOptionType {
  size: {
    width: number;
    height: number;
  };
}

export interface VoteRequest {
  voteId: string;
  selectedOption: 'A' | 'B';
}

export interface VoteItemResponse {
  id: string;
  title: string;
  description: string;
  optionA: DesignOptionSchema;
  optionB: DesignOptionSchema;
  votesA: number;
  votesB: number;
  totalVotes: number;
  hasVoted: boolean;
  nextVoteId: string | null;
  type: 'checkbox' | 'radio'; // 테스트 케이스 유형
}
