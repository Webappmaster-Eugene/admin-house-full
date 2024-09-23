import { GuestGuard } from '@/entities/auth/guard';

import { PropsReactNode } from 'src/utils/types';

import AuthShortLayout from 'src/layouts/auth/auth-short.layout';

export default async function Registerayout({ children }: PropsReactNode) {
  return (
    <GuestGuard>
      <AuthShortLayout>{children}</AuthShortLayout>
    </GuestGuard>
  );
}
