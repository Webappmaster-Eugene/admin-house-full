import { PropsReactNode } from '@/utils/types';
import { GuestGuard } from '@/entities/auth/guard';

import AuthShortLayout from 'src/layouts/auth/auth-short.layout';

export default async function ForgotPasswordLayout({ children }: PropsReactNode) {
  return (
    <GuestGuard>
      <AuthShortLayout>{children}</AuthShortLayout>
    </GuestGuard>
  );
}
