import { create } from 'zustand';

export const useUserAuthStore = create((set) => ({
  loggedin: false,
  setLoggedIn: () => set((state) => ({ loggedin: true })),
  setLoggedOut: () => set((state) => ({ loggedin: false })), // Function to set loggedin to false
}));