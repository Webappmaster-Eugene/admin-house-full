import type { Metadata } from 'next';

import ForgotPasswordStages from 'src/widgets/auth/forgot-password-stages/forgot-password-stages';

export const metadata: Metadata = {
  title: 'Восстановление пароля',
  description: 'Восстановление доступа к аккаунту SMETAS.',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordStages />;
}
