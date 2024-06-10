import { paths } from '@/shared/routes/paths';
import { useEffect, useCallback } from 'react';
import { useAuthContext } from '@/shared/auth/hooks';
import { useRouter, useSearchParams } from 'next/navigation';

import { SplashScreen } from 'src/shared/components';
import { PropsReactNode } from 'src/shared/utils/types/react-node.type';

export function GuestGuard({ children }: PropsReactNode) {
  const { loading } = useAuthContext();

  return <>{loading ? <SplashScreen /> : <Container>{children}</Container>}</>;
}

// ----------------------------------------------------------------------

function Container({ children }: PropsReactNode) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo') || paths.dashboard.root;

  const { authenticated } = useAuthContext();

  const check = useCallback(() => {
    if (authenticated) {
      router.replace(returnTo);
    }
  }, [authenticated, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}
