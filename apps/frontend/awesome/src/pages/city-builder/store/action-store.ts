import { create } from 'zustand';

type ActionStore = {
  selectedAction: 'create' | 'delete' | null;
  createLoad: () => void;
  deleteLoad: () => void;
  onSelectAction: (action: 'create' | 'delete' | null) => void;
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
    onSelectAction: (action) => {
      set({ selectedAction: action });
    },
  };
});

export default useActionStore;
