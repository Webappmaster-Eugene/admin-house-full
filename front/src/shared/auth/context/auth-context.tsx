'use client';

import { createContext } from 'react';

import { JWTContextType } from 'src/shared/utils/types/action-map-type';

export const AuthContext = createContext({} as JWTContextType);
