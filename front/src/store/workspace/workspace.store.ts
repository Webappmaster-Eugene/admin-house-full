import { create } from 'zustand';

import { AppState } from 'src/api/realisation-requests/app-state.type';
import { IWorkspaceState } from 'src/store/workspace/workspace-state-type';

export const useWorkspaceInfoStore = create<IWorkspaceState>(
  // devtools(
  //   persist(
  (set, get) => ({
    workspaceInfo: null,
    setWorkspaceInfo: (newWorkspaceInfo: AppState) => {
      set({
        workspaceInfo: newWorkspaceInfo,
      });
    },
    reset: () => {
      set({
        workspaceInfo: null,
      });
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
