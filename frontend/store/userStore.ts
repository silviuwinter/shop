import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthStorage, UserDto } from '../interfaces/userInterfaces';

export const useUserStore = create(
  persist<{
    auth: AuthStorage | null;
    setAuth: (auth: AuthStorage) => void;
    clearAuth: () => void;
    setUser: (user: UserDto) => void;
  }>(
    (set) => ({
      auth: null,

     
      setAuth: (auth: AuthStorage) => {
        set({ auth });
      },
      clearAuth: () => {
        set({ auth: null });
      },
      setUser: (user: AuthStorage['user']) => {
        set((state) => ({
          auth: {
            ...state.auth,
            user,
            token: state.auth?.token || '', // Ensure token is always a string
          },
        }));
      },
    }),
    {
      name: 'auth_data', // Key for localStorage
    }
  )
);
