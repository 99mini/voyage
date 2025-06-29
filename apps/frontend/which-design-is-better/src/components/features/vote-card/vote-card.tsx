import { useEffect, useState } from 'react';

import { VoteItemResponse, VoteRequest } from '@/apis/vote/model';

import { useVoteStore } from '@/stores/vote-store';

import DesignOption from '../design-option/design-option';

interface VoteCardProps {
  voteItem: VoteItemResponse;
}

export function VoteCard({ voteItem }: VoteCardProps) {
  const [selectedOption, setSelectedOption] = useState<VoteRequest['selectedOption'] | null>(null);
  const [hasVoted, setHasVoted] = useState(voteItem.hasVoted);

  const { castVote } = useVoteStore();

  const handleOptionClick = (option: VoteRequest['selectedOption']) => {
    if (!hasVoted) {
      setSelectedOption(option);
    }
  };

  const handleVote = async () => {
    if (selectedOption) {
      const payload: VoteRequest = {
        voteId: voteItem.id,
        selectedOption,
      };

      setHasVoted(true);
      await castVote(payload);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto my-6">
      <h2 className="text-2xl font-bold mb-2">{voteItem.title}</h2>
      <p className="text-gray-600 mb-6">{voteItem.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <DesignOption
          option={voteItem.optionA}
          votes={voteItem.votesA}
          totalVotes={voteItem.totalVotes}
          selected={selectedOption === 'A'}
          onClick={() => handleOptionClick('A')}
          showResults={hasVoted}
        />

        <DesignOption
          option={voteItem.optionB}
          votes={voteItem.votesB}
          totalVotes={voteItem.totalVotes}
          selected={selectedOption === 'B'}
          onClick={() => handleOptionClick('B')}
          showResults={hasVoted}
        />
      </div>

      {!hasVoted ? (
        <div className="text-center">
          <button
            className={`px-6 py-2 rounded-md ${
              selectedOption
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleVote}
            disabled={!selectedOption}
          >
            투표하기
          </button>
        </div>
      ) : (
        <div>
          <div className="text-center py-2 text-green-600 font-medium">투표해주셔서 감사합니다!</div>
        </div>
      )}

      <div className="mt-4 text-center text-sm text-gray-500">총 {voteItem.totalVotes}명이 투표했습니다</div>
    </div>
  );
}
