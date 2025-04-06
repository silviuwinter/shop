import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthStorage, UserDto } from '../interfaces/userInterfaces';

export const useUserStore = create(
  persist<{
    auth: AuthStorage | null; // auth info (user + token) or null if not logged in
    setAuth: (auth: AuthStorage) => void; // updates auth info
    clearAuth: () => void; // clears auth info
    setUser: (user: UserDto) => void; // updates just the user info
  }>(
    (set) => ({
      auth: null, // starts with no auth info

      setAuth: (auth: AuthStorage) => {
        set({ auth }); // updates auth with new data
      },
      clearAuth: () => {
        set({ auth: null }); // resets auth to null (logs out)
      },
      setUser: (user: AuthStorage['user']) => {
        set((state) => ({
          auth: {
            ...state.auth, // keeps existing auth data
            user, // updates user info
            token: state.auth?.token || '', // keeps token or sets empty string if missing
          },
        }));
      },
    }),
    {
      name: 'auth_data', // key used to save data in localStorage
    }
  )
);
