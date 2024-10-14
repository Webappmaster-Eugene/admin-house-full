import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { AppState } from 'src/api/realisation-requests/app-state.type';
import { IWorkspaceState } from 'src/store/workspace/workspace-state-type';

export const useWorkspaceInfoStore = create<IWorkspaceState, [['zustand/persist', unknown]]>(
  persist(
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
    }),
    {
      name: 'workspace-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
