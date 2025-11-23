import { createContext } from 'react';

import { InterativeFloatingContextType } from '../types/interactive-floating-type';

export const InteractiveFloatingContext = createContext<InterativeFloatingContextType | null>(null);
