'use client';

import React from 'react';

import { useCurrentUserStore } from 'src/auth/store/user-auth.store';

export default function CurrentUserProvider({ children }: { children: React.ReactNode }) {
  // const currentUserInfo = await getCurrentUser();
  const setUser = useCurrentUserStore((state) => state.setCurrentUser);
  // console.log('fefef34534r3f4', user);
  //
  // useEffect(() => setUser(user), [user, setUser]);

  return <>{children}</>; // return
}
