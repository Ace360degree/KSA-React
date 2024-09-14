import { create } from 'zustand';

export const useVisitedIdeasStore = create((set) => ({
  visited: false,
  setIdeasVisited: () => set((state) => ({ visited: true })),
}));
