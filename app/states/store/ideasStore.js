import { create } from 'zustand';

export const useVisitedIdeasStore = create((set) => ({
  visited: false,
  setVisited: () => set((state) => ({ visited: !state.visited })),
}));
