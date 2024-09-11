import { create } from 'zustand';

export const useVisitedStore = create((set) => ({
  visited: false,
  setVisited: () => set((state) => ({ visited: !state.visited })),
}));
