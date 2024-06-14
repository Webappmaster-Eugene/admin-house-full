import { redirect } from 'next/navigation';

import { getUser } from 'src/app/auth2/actions';

export const metadata = {
  title: 'Jwt: Login',
};

export default async function RoutePage() {
  const user = await getUser();

  if (!user) {
    redirect('/');
    // return notFound();
  }

  return <h1>Protected Page</h1>;
}
