import { create } from 'zustand';

import { IAuthState } from 'src/entities/auth/lib';

export const useCurrentUserStore = create<IAuthState>(
  // devtools(
  //   persist(
  (set, get) => ({
    user: null,
    loading: false,
    toggleLoading: () => {
      const { loading } = get();
      set({ loading: !loading });
    },
    setCurrentUser: (newCurrentUser) => {
      set({
        user: newCurrentUser,
      });
    },
    reset: () => {
      set({ loading: true });
      set({
        user: null,
      });
      set({ loading: false });
    },
  })
  //     {
  //       name: 'auth-store',
  //       storage: createJSONStorage(() => localStorage),
  //     }
  //   ),
  //   {
  //     name: 'auth-store',
  //     enabled: process.env.NEXT_FRONT_MODE === 'development',
  //   }
  // )
);
