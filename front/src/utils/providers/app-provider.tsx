'use client';

import React, { useEffect } from 'react';

import { useAppInfoStore } from 'src/utils/app-info/store/app-info.store';

export default function AppProvider({
  appInfo,
  children,
}: {
  appInfo: any;
  children: React.ReactNode;
}) {
  const setAppInfo = useAppInfoStore((state) => state.setAppInfo);

  useEffect(() => setAppInfo(appInfo), [appInfo, setAppInfo]);

  return <>{children}</>; // return
}
