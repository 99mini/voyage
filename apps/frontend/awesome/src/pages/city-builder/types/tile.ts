export type TileMeta = {
  position: [number, number];
};

// 타일 종류 정의
export type TileType = 'empty' | 'road' | 'building';

// 타일 상태 정의
export type TileState = {
  type: TileType;
  // 추가적인 상태 정보를 여기에 정의할 수 있습니다
};
