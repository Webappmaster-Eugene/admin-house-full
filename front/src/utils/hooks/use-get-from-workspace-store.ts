import { useState, useEffect } from 'react';

import { AppState } from 'src/api/realisation-requests/app-state.type';
import { useWorkspaceInfoStore } from 'src/store/workspace/workspace.store';

export function useGetFromWorkspaceStore() {
  const { workspaceInfo } = useWorkspaceInfoStore();
  const [state, setState] = useState<AppState | null>(null);
  useEffect(() => {
    setState((prevState) => workspaceInfo);
  }, [workspaceInfo]);
  return state;
}
