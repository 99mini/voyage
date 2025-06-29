import type { VoteItemResponse, VoteRequest } from './model';

const MOCK_VOTES: VoteItemResponse[] = [
  {
    id: '1',
    title: '체크박스 디자인',
    description: '다음 중 어떤 체크박스 디자인이 더 좋다고 생각하시나요?',
    optionA: {
      id: 'a1',
      imageUrl: 'https://static.zerovoyage.com/logo512x512.jpg',
      description: '라운드 스타일 체크박스',
      size: {
        width: 512,
        height: 512,
      },
    },
    optionB: {
      id: 'b1',
      imageUrl: 'https://static.zerovoyage.com/logo512x512.jpg',
      description: '스퀘어 스타일 체크박스',
      size: {
        width: 512,
        height: 512,
      },
    },
    votesA: 128,
    votesB: 85,
    totalVotes: 213,
    nextVoteId: '2',
    hasVoted: false,
  },
  {
    id: '2',
    title: '라디오 버튼 디자인',
    description: '다음 중 어떤 라디오 버튼 디자인이 더 좋다고 생각하시나요?',
    optionA: {
      id: 'a2',
      imageUrl: 'https://static.zerovoyage.com/logo512x512.jpg',
      description: '미니멀 스타일 라디오 버튼',
      size: {
        width: 512,
        height: 512,
      },
    },
    optionB: {
      id: 'b2',
      imageUrl: 'https://static.zerovoyage.com/logo512x512.jpg',
      description: '하이라이트 스타일 라디오 버튼',
      size: {
        width: 512,
        height: 512,
      },
    },
    votesA: 95,
    votesB: 112,
    totalVotes: 207,
    nextVoteId: null,
    hasVoted: false,
  },
];

export const getPopularVoteList = async (): Promise<VoteItemResponse[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_VOTES.sort((a, b) => b.totalVotes - a.totalVotes).slice(0, 5));
    }, 500);
  });
};

export const getVoteList = async (): Promise<VoteItemResponse[]> => {
  // 실제 API 호출 대신 목업 데이터 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_VOTES);
    }, 500); // 0.5초 지연
  });
};

// 단일 투표 항목 가져오기 API
export const getVote = async (id: string): Promise<VoteItemResponse | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_VOTES.find((item) => item.id === id));
    }, 300);
  });
};

export const submitVote = async (req: VoteRequest): Promise<VoteItemResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const voteItem = MOCK_VOTES.find((item) => item.id === req.voteId);

      if (!voteItem) {
        throw new Error('Vote item not found');
      }

      // 투표 결과 업데이트 (목업이므로 실제 데이터는 변경되지 않음)
      const updatedItem = { ...voteItem };

      if (req.selectedOption === 'A') {
        updatedItem.votesA += 1;
      } else {
        updatedItem.votesB += 1;
      }

      updatedItem.totalVotes += 1;

      updatedItem.hasVoted = true;

      resolve(updatedItem);
    }, 700);
  });
};
