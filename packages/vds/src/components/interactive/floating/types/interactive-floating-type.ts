import { RefObject } from 'react';

export type InterativeFloatingContextType = {
  ref: RefObject<HTMLDivElement>;
  state: InteravtiveFloatingState;
};

export type InteravtiveFloatingState = {
  interesting: boolean;
};
