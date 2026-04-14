'use client';

import React, { useEffect } from 'react';
import { AppInfoGetCommand } from '@numart/house-admin-contracts';
import { useAppInfoStore } from '@/store/app-info/store/app-info.store';

export default function AppProvider({
  appInfo,
  children,
}: {
  appInfo: AppInfoGetCommand.ResponseEntity;
  children: React.ReactNode;
}) {
  const setAppInfo = useAppInfoStore((state) => state.setAppInfo);

  useEffect(() => setAppInfo(appInfo), [appInfo, setAppInfo]);

  return <>{children}</>; // return
}
