'use client';

import { PropsReactNode } from 'src/shared/utils';
import { SplashScreen } from 'src/shared/components';
import { AuthContext } from 'src/shared/auth/context/auth-context';

export function AuthConsumer({ children }: PropsReactNode) {
  return (
    <AuthContext.Consumer>
      {(auth) => (auth.loading ? <SplashScreen /> : children)}
    </AuthContext.Consumer>
  );
}
