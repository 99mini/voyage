import RootLayout from '@/components/layout/root-layout';

import Tile from './components/game-object/tile';
import GameLayout from './components/game/game-layout';
import GameScreen from './components/game/game-screen';
import UILayout from './components/ui/ui-layout';

const CityBuilderPage = () => {
  return (
    <RootLayout title="City Builder">
      <GameLayout>
        <UILayout position="top" className="w-full h-16">
          top
        </UILayout>
        <GameScreen>
          {Array.from({ length: 1000 }).map((_, index) => (
            <Tile key={index} border className="flex items-center justify-center">
              {index}
            </Tile>
          ))}
        </GameScreen>
        <UILayout position="bottom" className="w-full h-16">
          bottom
        </UILayout>
      </GameLayout>
    </RootLayout>
  );
};

export default CityBuilderPage;
