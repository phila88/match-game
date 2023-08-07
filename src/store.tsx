import { create } from 'zustand';

export type Card = {
  id: number;
  name: number;
};

type State = {
  list: Card[];
  matches: Card[];
  currentPair: Card[];
  gameState: 'pick1st' | 'pick2nd' | 'verify' | 'match';
};

type Actions = {
  matchFound: (a: Card, b: Card) => void;
  updateGameState: (s: 'pick1st' | 'pick2nd' | 'verify' | 'match') => void;
  updatePair: (a: Card) => void;
  resetPair: () => void;
  resetGame: () => void;
};

const initialState: State = {
  list: [
    { id: 0, name: 1 },
    { id: 1, name: 2 },
    { id: 2, name: 3 },
    { id: 3, name: 4 },
    { id: 4, name: 5 },
    { id: 5, name: 6 },
    { id: 6, name: 1 },
    { id: 7, name: 2 },
    { id: 8, name: 3 },
    { id: 9, name: 4 },
    { id: 10, name: 5 },
    { id: 11, name: 6 },
  ].sort(() => Math.random() - 0.5),
  matches: [],
  currentPair: [
    { id: -1, name: -1 },
    { id: -1, name: -1 },
  ],
  gameState: 'pick1st',
};

export const useStore = create<State & Actions>()((set) => ({
  ...initialState,
  matchFound: (a, b) => set((state) => ({ matches: [...state.matches, a, b] })),
  updateGameState: (s) => set({ gameState: s }),
  updatePair: (p) =>
    set((state) => {
      const t = [...state.currentPair];
      if (t[0].id === -1) t[0] = p;
      else t[1] = p;
      return { currentPair: t };
    }),
  resetPair: () => set({ currentPair: initialState.currentPair }),
  resetGame: () => {
    const t = [...initialState.list];
    t.sort(() => Math.random() - 0.5);
    set({
      list: t,
      matches: [],
      currentPair: initialState.currentPair,
      gameState: initialState.gameState,
    });
  },
}));
