import type { Metadata } from 'next';

import RegisterWithRoleKeyView from 'src/widgets/auth/register-with-role-key-view';

export const metadata: Metadata = {
  title: 'Регистрация по ключу роли',
  description: 'Регистрация в SMETAS с ролью, выданной администратором.',
};

export default async function RegisterWithRoleKeyPage() {
  return <RegisterWithRoleKeyView />;
}
