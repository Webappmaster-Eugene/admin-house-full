import { AppState } from 'src/api/realisation-requests/app-state.type';

export interface IWorkspaceState {
  workspaceInfo: AppState | null;
  setWorkspaceInfo: (newWorkspaceInfo: AppState) => void;
  reset: () => void;
}
