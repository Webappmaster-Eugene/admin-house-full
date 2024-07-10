import { AppState } from 'src/api/realisation-requests/app-state.type';

export function isGoodWorkspaceInfoTypeGuard(workspaceInfo: AppState | null): boolean {
  if (workspaceInfo && 'error' in workspaceInfo && workspaceInfo.error === false) {
    return true;
  }
  return false;
}
