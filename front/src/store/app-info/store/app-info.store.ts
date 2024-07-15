import { create } from 'zustand';
import { AppInfoGetCommand } from '@numart/house-admin-contracts';

interface IAuthState {
  appInfo: AppInfoGetCommand.ResponseEntity | null;
  setAppInfo: (newAppInfo: AppInfoGetCommand.ResponseEntity) => void;
  reset: () => void;
}

export const useAppInfoStore = create<IAuthState>(
  // devtools(
  //   persist(
  (set, get) => ({
    appInfo: null,
    setAppInfo: (newAppInfo) => {
      set({
        appInfo: newAppInfo,
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
