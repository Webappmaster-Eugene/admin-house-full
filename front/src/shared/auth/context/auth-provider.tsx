'use client';

import { useMemo, useEffect, useReducer, useCallback } from 'react';
import { UserGetFullInfoCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/shared/utils/auth/axios';
import { isValidToken } from 'src/shared/utils/auth/auth.utils';
import { axiosEndpoints } from 'src/shared/utils/auth/endpoints';
import { AuthContext } from 'src/shared/auth/context/auth-context';
import { AuthStateType } from 'src/shared/utils/auth/auth-state-type';
import { ActionMapType } from 'src/shared/utils/types/action-map-type';
import { PropsReactNode } from 'src/shared/utils/types/react-node.type';
import { localStorageKeys } from 'src/shared/utils/const/keys.localstorage';

enum ActionTypeNames {
  INITIAL = 'INITIAL',
}

type Payload = {
  [ActionTypeNames.INITIAL]: {
    user: (UserGetFullInfoCommand.ResponseEntity & { accessToken: string }) | null;
  };
};

export type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === ActionTypeNames.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export function AuthProvider({ children }: PropsReactNode) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

      if (accessToken && isValidToken(accessToken, 'ACCESS_TOKEN')) {
        const userFullInfoResponse: UserGetFullInfoCommand.Response = await axiosInstance.get(
          axiosEndpoints.users.me
        );

        const userFullInfo: UserGetFullInfoCommand.ResponseEntity = userFullInfoResponse.data;

        dispatch({
          type: ActionTypeNames.INITIAL,
          payload: {
            user: {
              accessToken,
              ...userFullInfo,
            },
          },
        });
      } else {
        dispatch({
          type: ActionTypeNames.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: ActionTypeNames.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const statusAuthentication = state.user ? 'authenticated' : 'unauthenticated';

  const statusLoading = state.loading ? 'loading' : 'ready';

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      loading: statusLoading === 'loading',
      authenticated: statusAuthentication === 'authenticated',
    }),
    [state.user, statusLoading, statusAuthentication]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
