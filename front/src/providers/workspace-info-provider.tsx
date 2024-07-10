'use client';

import React, { useEffect } from 'react';

import { AppState } from 'src/api/realisation-requests/app-state.type';
import { useWorkspaceInfoStore } from 'src/store/workspace/workspace.store';

export default function WorkspaceInfoProvider({
  workspaceInfo,
  children,
}: {
  workspaceInfo: AppState | null;
  children: React.ReactNode;
}) {
  const { setWorkspaceInfo } = useWorkspaceInfoStore((state) => state);

  useEffect(() => {
    if (workspaceInfo) {
      setWorkspaceInfo(workspaceInfo);
    }
  }, [setWorkspaceInfo, workspaceInfo]);

  return <>{children}</>;
}
