import { useContext } from 'react';

import { InteractiveFloatingContext } from '../contexts/interactive-floating-context';

export const useInteractiveFloating = () => {
  const context = useContext(InteractiveFloatingContext);

  if (!context) {
    throw new Error('useInteractiveFloating must be used within an InteractiveFloatingProvider');
  }

  return context;
};
