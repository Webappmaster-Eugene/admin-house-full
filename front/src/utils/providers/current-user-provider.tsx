'use client';

import React, { useEffect } from 'react';
import { UserGetFullInfoCommand } from '@numart/house-admin-contracts';

import { useCurrentUserStore } from 'src/utils/auth/store/user-auth.store';

export default function CurrentUserProvider({
  currentUserInfo,
  children,
}: {
  currentUserInfo: UserGetFullInfoCommand.ResponseEntity | null;
  children: React.ReactNode;
}) {
  const setUser = useCurrentUserStore((state) => state.setCurrentUser);
  useEffect(() => setUser(currentUserInfo), [currentUserInfo, setUser]);
  return <>{children}</>;
}
