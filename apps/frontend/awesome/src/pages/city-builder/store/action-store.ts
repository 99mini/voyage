import { create } from 'zustand';

// 액션 타입 정의
export type ActionType = 'create' | 'delete' | 'buildRoad' | null;

type ActionStore = {
  selectedAction: ActionType;
  createLoad: () => void;
  deleteLoad: () => void;
  buildRoad: () => void;
  onSelectAction: (action: ActionType) => void;
};

const useActionStore = create<ActionStore>((set) => {
  return {
    selectedAction: null,
    createLoad: () => {
      set({ selectedAction: 'create' });
    },
    deleteLoad: () => {
      set({ selectedAction: 'delete' });
    },
    buildRoad: () => {
      set({ selectedAction: 'buildRoad' });
    },
    onSelectAction: (action) => {
      set({ selectedAction: action });
    },
  };
});

export default useActionStore;
