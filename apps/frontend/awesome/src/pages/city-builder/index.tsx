import RootLayout from '@/components/layout/root-layout';

import Tile from './components/game-object/tile/tile';
import GameLayout from './components/game/game-layout';
import GameScreen from './components/game/game-screen';
import BottomUI from './components/ui/bottom-ui';
import TopUI from './components/ui/top-ui';

// 가로 50개, 세로 50개의 타일 생성
const GRID_WIDTH = 50;
const GRID_HEIGHT = 50;

const GRID_PADDING = 12;

const CityBuilderPage = () => {
  return (
    <RootLayout title="City Builder">
      <GameLayout>
        <GameScreen>
          <div
            className="grid grid-flow-row"
            style={{ gridTemplateColumns: `repeat(${GRID_WIDTH + GRID_PADDING * 2}, 2rem)` }}
          >
            {Array.from({ length: GRID_HEIGHT + GRID_PADDING * 2 }).map((_, rowIndex) =>
              Array.from({ length: GRID_WIDTH + GRID_PADDING * 2 }).map((_, colIndex) => {
                const tileIndex = rowIndex * (GRID_WIDTH + GRID_PADDING * 2) + colIndex;
                return (
                  <Tile
                    key={tileIndex}
                    border
                    className="flex items-center justify-center text-xs"
                    meta={{ position: [colIndex, rowIndex] }}
                  >
                    {tileIndex}
                  </Tile>
                );
              }),
            )}
          </div>
        </GameScreen>
        <TopUI />
        <BottomUI />
      </GameLayout>
    </RootLayout>
  );
};

export default CityBuilderPage;
