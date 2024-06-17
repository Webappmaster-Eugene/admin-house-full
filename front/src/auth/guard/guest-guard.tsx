import { redirect, usePathname } from 'next/navigation';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { PropsReactNode } from 'src/utils/types';

import { useCurrentUserStore } from 'src/auth/store/user-auth.store';

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
