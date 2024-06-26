'use client';

import { SplashScreen } from '@/shared/loading-screen';
import { redirect, usePathname } from 'next/navigation';
import { useCurrentUserStore } from '@/store/auth/user-auth.store';

import { paths } from 'src/utils/routes/paths';
import { PropsReactNode } from 'src/utils/types';
import { useRouter } from 'src/utils/hooks/router-hooks/use-router';

export default function AuthGuard({ children }: PropsReactNode) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useCurrentUserStore((state) => state);

  if (!user) {
    // router.push(PATH_AFTER_LOGIN);
    redirect(paths.auth.login);
  }
  if (user && (pathname === paths.auth.login || pathname === paths.auth.register)) {
    // router.push(PATH_AFTER_LOGIN);
    redirect(paths.dashboard.root);
  }
  return <>{loading ? <SplashScreen /> : <Container>{children}</Container>} </>;
}

// ----------------------------------------------------------------------

function Container({ children }: PropsReactNode) {
  // const router = useRouter();
  // const { status } = useAuthContext();
  //
  // const [checked, setChecked] = useState(false);
  //
  // const check = useCallback(() => {
  //   if (!authenticated) {
  //     const searchParams = new URLSearchParams({
  //       returnTo: window.location.pathname,
  //     }).toString();
  //
  //     const loginPath = paths.auth.login;
  //
  //     const href = `${loginPath}?${searchParams}`;
  //
  //     router.replace(href);
  //   } else {
  //     setChecked(true);
  //   }
  // }, [authenticated, method, router]);
  //
  // useEffect(() => {
  //   check();
  //   // eslint-disable-next-line react-router-hooks/exhaustive-deps
  // }, []);
  //
  // if (!checked) {
  //   return null;
  // }

  return <>{children}</>;
}
