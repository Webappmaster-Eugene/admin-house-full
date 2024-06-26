'use client';

import React, { useEffect } from 'react';
import { useCurrentUserStore } from '@/store/auth/user-auth.store';
import { UserGetFullInfoCommand } from '@numart/house-admin-contracts';

export default function CurrentUserProvider({
  currentUserInfo,
  children,
}: {
  currentUserInfo: UserGetFullInfoCommand.ResponseEntity | null;
  children: React.ReactNode;
}) {
  const { toggleLoading, setCurrentUser } = useCurrentUserStore((state) => state);

  useEffect(() => {
    toggleLoading();
    setCurrentUser(currentUserInfo);
    toggleLoading();
  }, [currentUserInfo, setCurrentUser, toggleLoading]);

  return <>{children}</>;
}
