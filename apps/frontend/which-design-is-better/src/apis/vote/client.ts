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
    nextVoteId: '3',
    hasVoted: false,
  },
  {
    id: '3',
    title: '탭 디자인',
    description: '수평 vs 수직 탭 디자인 중 어느 쪽이 더 보기 좋나요?',
    optionA: {
      id: 'a3',
      imageUrl: 'https://static.zerovoyage.com/logo512x512.jpg',
      description: '수평 탭',
      size: { width: 512, height: 512 },
    },
    optionB: {
      id: 'b3',
      imageUrl: 'https://static.zerovoyage.com/logo512x512.jpg',
      description: '수직 탭',
      size: { width: 512, height: 512 },
    },
    votesA: 150,
    votesB: 98,
    totalVotes: 248,
    nextVoteId: '4',
    hasVoted: false,
  },
  {
    id: '4',
    title: '모달 창 디자인',
    description: '라이트 vs 다크 모달 중 어떤 디자인을 선호하시나요?',
    optionA: {
      id: 'a4',
      imageUrl: 'https://static.zerovoyage.com/logo512x512.jpg',
      description: '라이트 모달',
      size: { width: 512, height: 512 },
    },
    optionB: {
      id: 'b4',
      imageUrl: 'https://static.zerovoyage.com/logo512x512.jpg',
      description: '다크 모달',
      size: { width: 512, height: 512 },
    },
    votesA: 210,
    votesB: 300,
    totalVotes: 510,
    nextVoteId: '5',
    hasVoted: false,
  },
  {
    id: '5',
    title: '버튼 그림자 스타일',
    description: '플랫 vs 네오모피즘 버튼 그림자 중 더 매력적인 것은?',
    optionA: {
      id: 'a5',
      imageUrl: 'https://static.zerovoyage.com/logo512x512.jpg',
      description: '플랫',
      size: { width: 512, height: 512 },
    },
    optionB: {
      id: 'b5',
      imageUrl: 'https://static.zerovoyage.com/logo512x512.jpg',
      description: '네오모피즘',
      size: { width: 512, height: 512 },
    },
    votesA: 180,
    votesB: 220,
    totalVotes: 400,
    nextVoteId: '6',
    hasVoted: false,
  },
  {
    id: '6',
    title: '알림 배너 위치',
    description: '상단 vs 하단 배너 중 어느 위치가 더 적합하다고 생각하시나요?',
    optionA: {
      id: 'a6',
      imageUrl: 'https://static.zerovoyage.com/logo512x512.jpg',
      description: '상단',
      size: { width: 512, height: 512 },
    },
    optionB: {
      id: 'b6',
      imageUrl: 'https://static.zerovoyage.com/logo512x512.jpg',
      description: '하단',
      size: { width: 512, height: 512 },
    },
    votesA: 75,
    votesB: 140,
    totalVotes: 215,
    nextVoteId: '7',
    hasVoted: false,
  },
  {
    id: '7',
    title: '카드 레이아웃',
    description: '카드 내부 그림자 vs 외부 그림자, 어떤 레이아웃이 더 눈에 띄나요?',
    optionA: {
      id: 'a7',
      imageUrl: 'https://static.zerovoyage.com/logo512x512.jpg',
      description: '내부 그림자',
      size: { width: 512, height: 512 },
    },
    optionB: {
      id: 'b7',
      imageUrl: 'https://static.zerovoyage.com/logo512x512.jpg',
      description: '외부 그림자',
      size: { width: 512, height: 512 },
    },
    votesA: 120,
    votesB: 180,
    totalVotes: 300,
    nextVoteId: '8',
    hasVoted: false,
  },
  {
    id: '8',
    title: '아이콘 스타일',
    description: '선형 vs 채색 아이콘 중 어떤 스타일이 더 현대적이라고 느끼시나요?',
    optionA: {
      id: 'a8',
      imageUrl: 'https://static.zerovoyage.com/logo512x512.jpg',
      description: '선형 아이콘',
      size: { width: 512, height: 512 },
    },
    optionB: {
      id: 'b8',
      imageUrl: 'https://static.zerovoyage.com/logo512x512.jpg',
      description: '채색 아이콘',
      size: { width: 512, height: 512 },
    },
    votesA: 260,
    votesB: 90,
    totalVotes: 350,
    nextVoteId: '9',
    hasVoted: false,
  },
  {
    id: '9',
    title: '로딩 스피너',
    description: '둥근 스피너 vs 점진적 바, 어느 로딩 표시기가 더 선호되시나요?',
    optionA: {
      id: 'a9',
      imageUrl: 'https://static.zerovoyage.com/logo512x512.jpg',
      description: '원형 스피너',
      size: { width: 512, height: 512 },
    },
    optionB: {
      id: 'b9',
      imageUrl: 'https://static.zerovoyage.com/logo512x512.jpg',
      description: '프로그레스 바',
      size: { width: 512, height: 512 },
    },
    votesA: 140,
    votesB: 160,
    totalVotes: 300,
    nextVoteId: '10',
    hasVoted: false,
  },
  {
    id: '10',
    title: '툴팁 애니메이션',
    description: '페이드 vs 슬라이드 애니메이션 중 어떤 툴팁이 더 자연스럽나요?',
    optionA: {
      id: 'a10',
      imageUrl: 'https://static.zerovoyage.com/logo512x512.jpg',
      description: '페이드 인/아웃',
      size: { width: 512, height: 512 },
    },
    optionB: {
      id: 'b10',
      imageUrl: 'https://static.zerovoyage.com/logo512x512.jpg',
      description: '슬라이드',
      size: { width: 512, height: 512 },
    },
    votesA: 330,
    votesB: 120,
    totalVotes: 450,
    nextVoteId: '11',
    hasVoted: false,
  },
  {
    id: '11',
    title: '검색창 레이아웃',
    description: '라운드 vs 각진 검색창 중 어떤 디자인이 더 세련되었나요?',
    optionA: {
      id: 'a11',
      imageUrl: 'https://static.zerovoyage.com/logo512x512.jpg',
      description: '라운드',
      size: { width: 512, height: 512 },
    },
    optionB: {
      id: 'b11',
      imageUrl: 'https://static.zerovoyage.com/logo512x512.jpg',
      description: '각진',
      size: { width: 512, height: 512 },
    },
    votesA: 200,
    votesB: 180,
    totalVotes: 380,
    nextVoteId: '12',
    hasVoted: false,
  },
  {
    id: '12',
    title: '다크 모드 색상 팔레트',
    description: '보라 계열 vs 파랑 계열 다크 모드 중 어떤 팔레트가 더 눈에 편안한가요?',
    optionA: {
      id: 'a12',
      imageUrl: 'https://static.zerovoyage.com/logo512x512.jpg',
      description: '보라 계열',
      size: { width: 512, height: 512 },
    },
    optionB: {
      id: 'b12',
      imageUrl: 'https://static.zerovoyage.com/logo512x512.jpg',
      description: '파랑 계열',
      size: { width: 512, height: 512 },
    },
    votesA: 170,
    votesB: 260,
    totalVotes: 430,
    nextVoteId: null,
    hasVoted: false,
  },
];

export const getPopularVoteList = async (): Promise<VoteItemResponse[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_VOTES.sort((a, b) => b.totalVotes - a.totalVotes).slice(0, 10));
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
