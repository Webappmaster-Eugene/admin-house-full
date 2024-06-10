'use client';

import { useContext } from 'react';
import { AuthContext } from '@/shared/auth/context/auth-context';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    console.error(
      'useAuthContext context must be use inside AuthProvider (context of full app/layout.tsx)'
    );
    throw new Error(
      'useAuthContext context must be use inside AuthProvider (context of full app/layout.tsx)'
    );
  } else {
    return context;
  }
};
