import { DesignOptionType } from '@/lib/types';

export interface VoteRequest {
  voteId: string;
  selectedOption: 'A' | 'B';
}

export interface VoteItemResponse {
  id: string;
  title: string;
  description: string;
  optionA: DesignOptionType;
  optionB: DesignOptionType;
  votesA: number;
  votesB: number;
  totalVotes: number;
  type: 'checkbox' | 'radio'; // 테스트 케이스 유형
}
