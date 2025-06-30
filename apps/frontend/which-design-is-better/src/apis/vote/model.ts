import { DesignOptionType } from '@/lib/types';

export interface DesignOptionSchema extends DesignOptionType {
  size: {
    width: number;
    height: number;
  };
}

export interface GetVoteRequest {
  /**
   * @description meta 정보 포함 여부
   */
  m?: boolean;
  /**
   * @description 투표 결과 정보 포함 여부
   */
  v?: boolean;
}

export interface SubmitVoteRequest {
  voteId: string;
  selectedOption: 'A' | 'B';
}

export interface VoteMetaResponse {
  id: string;
  title: string;
  description: string;
  optionA: DesignOptionSchema;
  optionB: DesignOptionSchema;
}

export interface VoteResultResponse {
  id: string;
  votesA: number;
  votesB: number;
  totalVotes: number;
  hasVoted: boolean;
  nextVoteId: string | null;
}

export interface VoteItemResponse extends VoteMetaResponse, VoteResultResponse {}
