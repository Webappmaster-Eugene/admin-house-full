'use client';

import { IJWTPayload } from '@numart/house-admin-contracts';
import { useMemo, useEffect, useReducer, useCallback, createContext } from 'react';

import { PropsReactNode } from 'src/utils/types';
import { isValidToken } from 'src/utils/auth/token-helpers';
import { IAccessTokenInfo } from 'src/utils/types/access-token.interface';
import { isAccessTokenInfo } from 'src/utils/type-guards/access-token-info.type-guard';

import { ActionMapType } from 'src/auth/types';
import { getCurrentTokens } from 'src/api/actions/auth-actions/get-current-tokens.action';

enum TypesActions {
  INITIAL = 'INITIAL',
}

type AuthStateType = {
  status?: string;
  loading: boolean;
  user: IJWTPayload | null;
};

type Payload = {
  [TypesActions.INITIAL]: {
    user: IJWTPayload | null;
  };
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === TypesActions.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  return state;
};

export function AuthProvider({ children }: PropsReactNode) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      let accessTokenInfo: IAccessTokenInfo | null = null;

      const accessTokenWithInfo: IAccessTokenInfo | unknown | null = await getCurrentTokens();
      if (isAccessTokenInfo(accessTokenWithInfo)) {
        accessTokenInfo = accessTokenWithInfo as IAccessTokenInfo;
      }

      if (accessTokenInfo && isValidToken(accessTokenInfo.accessToken)) {
        // setSession(accessToken);

        const accessTokenUserInfo = accessTokenInfo.accessTokenInfo;

        dispatch({
          type: TypesActions.INITIAL,
          payload: {
            user: {
              ...accessTokenUserInfo,
            },
          },
        });
      } else {
        dispatch({
          type: TypesActions.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: TypesActions.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
    }),
    [state.user, status]
  );
  const AuthContext = createContext({} as AuthStateType);
  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
