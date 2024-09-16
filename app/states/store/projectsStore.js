import { create } from 'zustand';

export const useVisitedProjectsStore = create((set) => ({
  visited: false,
  setVisited: () => set((state) => ({ visited:true })),
}));
