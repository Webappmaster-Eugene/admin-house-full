import Image from 'next/image';
import { redirect } from 'next/navigation';

import { paths } from 'src/utils/routes/paths';

export default function RootPage() {
  // const router = useRouter();
  // useEffect(() => {
  //   router.push(PATH_AFTER_LOGIN);
  // }, [router]);

  redirect(paths.dashboard.root);

  return (
    <>
      <h1>Добро пожаловать!</h1>
      <Image src="/images/picture.png" alt="Заставка" width={1000} height={1000} />;
    </>
  );
}
