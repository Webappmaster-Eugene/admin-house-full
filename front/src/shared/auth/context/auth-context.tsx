'use client';

import { createContext } from 'react';

import { JWTContextType } from 'src/shared/auth/types';

export const AuthContext = createContext({} as JWTContextType);
