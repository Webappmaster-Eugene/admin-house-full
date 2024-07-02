import { GuestGuard } from '@/entities/auth/guard';

import { PropsReactNode } from 'src/utils/types';

import AuthLayout from 'src/layouts/auth/auth.layout';

export default async function Registerayout({ children }: PropsReactNode) {
  return (
    <GuestGuard>
      <AuthLayout>{children}</AuthLayout>
    </GuestGuard>
  );
}
