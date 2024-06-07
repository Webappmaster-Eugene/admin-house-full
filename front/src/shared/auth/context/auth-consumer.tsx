'use client';

import { SplashScreen } from 'src/entities/loading-screen';
import { AuthContext } from 'src/shared/auth/context/auth-context';

type Props = {
  children: React.ReactNode;
};

export function AuthConsumer({ children }: Props) {
  return (
    <AuthContext.Consumer>
      {(auth) => (auth.loading ? <SplashScreen /> : children)}
    </AuthContext.Consumer>
  );
}
