import { create } from 'zustand';

export const useUserAuthStore = create((set) => ({
  loggedin: false,
  setLoggedIn: () => set((state) => ({ loggedin: true })),
}));
