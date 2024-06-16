import { create } from 'zustand';
import { UserGetFullInfoCommand } from '@numart/house-admin-contracts';

type CurrentUserInfo = UserGetFullInfoCommand.ResponseEntity | null;

interface IAuthState {
  user: CurrentUserInfo;
  setCurrentUser: (newDataUser: UserGetFullInfoCommand.ResponseEntity | null) => void;
  reset: () => void;
}

export const useCurrentUserStore = create<IAuthState>(
  // devtools(
  //   persist(
  (set, get) => ({
    user: null,
    setCurrentUser: (newCurrentUser) => {
      set({
        user: newCurrentUser,
      });
    },
    reset: () => {},
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
