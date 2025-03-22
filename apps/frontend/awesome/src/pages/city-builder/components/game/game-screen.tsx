import { cn } from '@packages/vds';

import './scrollbar.css';

type GameScreenProps = {
  children: React.ReactNode;
};

/**
 * 125px: Header height
 * 49px: Footer height
 * 32px: Theme Title height
 * 32px: Vertical padding
 * 16px: Title bottom margin
 */
const GAME_SCREEN_HEIGHT = 'calc(100vh - 125px - 49px - 32px - 16px - 32px)';

const GameScreen = ({ children }: GameScreenProps) => {
  return (
    <div
      className={cn('game-scrollbar', 'w-full flex overflow-auto scrollbar-hide')}
      style={{ maxHeight: GAME_SCREEN_HEIGHT }}
    >
      {children}
    </div>
  );
};

export default GameScreen;
