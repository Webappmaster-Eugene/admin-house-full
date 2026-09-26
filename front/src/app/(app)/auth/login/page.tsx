import type { Metadata } from 'next';

import LoginView from 'src/widgets/auth/login-view';

export const metadata: Metadata = {
  title: 'Вход',
  description: 'Вход в SMETAS — платформу для составления строительных смет.',
};

export default async function LoginPage() {
  return <LoginView />;
}
