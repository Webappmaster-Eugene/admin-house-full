import type { Metadata } from 'next';

import RegisterView from 'src/widgets/auth/register-view';

export const metadata: Metadata = {
  title: 'Регистрация',
  description: 'Регистрация в SMETAS — платформе для составления строительных смет.',
};

export default async function RegisterPage() {
  return <RegisterView />;
}
