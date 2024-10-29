import { create } from 'zustand';

export const useUserAuthStore = create((set) => ({
  loggedin: false,
  
  setLoggedIn: () => {
    console.log("Logging in...");
    set({ loggedin: true });
  },
  
  setLoggedOut: () => {
    console.log("Logging out...Zustand");
    set({ loggedin: false });
  }
}));
