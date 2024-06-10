import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

import { paths } from 'src/shared/routes/paths';
import { SplashScreen } from 'src/shared/components';
import { useAuthContext } from 'src/shared/auth/hooks';
import { PropsReactNode } from 'src/shared/utils/types/react-node.type';

export function AuthGuard({ children }: PropsReactNode) {
  const { loading } = useAuthContext();

  return <>{loading ? <SplashScreen /> : <GuardContainer>{children}</GuardContainer>}</>;
}

function GuardContainer({ children }: PropsReactNode) {
  const router = useRouter();

  const { authenticated } = useAuthContext();
  console.log();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      // const loginPath = loginPaths[method];
      const loginPath = paths.auth.login;

      const href = `${loginPath}?${searchParams}`;

      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [authenticated, router]);

  useEffect(() => {
    check();
  }, [check]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
