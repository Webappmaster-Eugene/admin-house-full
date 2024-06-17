import { redirect, usePathname } from 'next/navigation';

import { paths } from 'src/utils/routes/paths';
import { PropsReactNode } from 'src/utils/types';
import { useRouter } from 'src/utils/hooks/router-hooks/use-router';
import { useCurrentUserStore } from 'src/utils/auth/store/user-auth.store';

import { SplashScreen } from 'src/components/loading-screen';

export default function GuestGuard({ children }: PropsReactNode) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useCurrentUserStore((state) => state);

  if (user && (pathname === `${paths.auth.login}/` || pathname === `${paths.auth.register}/`)) {
    // router.push(PATH_AFTER_LOGIN);
    redirect(paths.dashboard.root);
  }
  return <>{loading ? <SplashScreen /> : <Container>{children}</Container>} </>;
}

// ----------------------------------------------------------------------

function Container({ children }: PropsReactNode) {
  // const router = useRouter();
  //
  // const searchParams = useSearchParams();
  //
  // const returnTo = searchParams.get('returnTo') || paths.dashboard.root;
  //
  // const { authenticated } = useAuthContext();
  //
  // const check = useCallback(() => {
  //   if (authenticated) {
  //     router.replace(returnTo);
  //   }
  // }, [authenticated, returnTo, router]);
  //
  // useEffect(() => {
  //   check();
  // }, [check]);

  return <>{children}</>;
}
