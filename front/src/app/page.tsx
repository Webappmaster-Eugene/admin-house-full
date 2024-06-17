'use client';

import { redirect } from 'next/navigation';

import { paths } from 'src/routes/paths';

export default function RootPage() {
  // const router = useRouter();
  // useEffect(() => {
  //   router.push(PATH_AFTER_LOGIN);
  // }, [router]);
  redirect(paths.dashboard.root);
  // return <SplashScreen />;
}
