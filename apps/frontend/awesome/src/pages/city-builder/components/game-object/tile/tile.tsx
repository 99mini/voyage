import { useState } from 'react';
import { cn } from '@packages/vds';

import useActionStore from '@/pages/city-builder/store/action-store';
import { TileMeta, TileState, TileType } from '@/pages/city-builder/types/tile';

type TileProps = {
  children: React.ReactNode;
  meta?: TileMeta;
  border?: boolean;
  className?: string;
};

const Tile = ({ children, meta, border, className }: TileProps) => {
  // 타일의 초기 상태는 빈 타일
  const [tileState, setTileState] = useState<TileState>({ type: 'empty' });
  
  // 액션 스토어에서 현재 선택된 액션 가져오기
  const { selectedAction } = useActionStore();
  
  // 타일 클릭 이벤트 핸들러
  const handleTileClick = () => {
    // 선택된 액션에 따라 타일 상태 변경
    switch (selectedAction) {
      case 'buildRoad':
        setTileState({ type: 'road' });
        break;
      case 'create':
        setTileState({ type: 'building' });
        break;
      case 'delete':
        setTileState({ type: 'empty' });
        break;
      default:
        // 선택된 액션이 없으면 아무 동작도 하지 않음
        break;
    }
  };
  
  // 타일 타입에 따른 스타일 클래스 결정
  const getTileStyle = (type: TileType) => {
    switch (type) {
      case 'road':
        return 'bg-gray-500';
      case 'building':
        return 'bg-blue-300';
      case 'empty':
      default:
        return '';
    }
  };

  return (
    <div 
      className={cn(
        'size-8', 
        border && 'border border-gray-300 border-dashed', 
        getTileStyle(tileState.type),
        className
      )}
      onClick={handleTileClick}
    >
      {children}
    </div>
  );
};

export default Tile;
