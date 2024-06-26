'use client';

import { PropsReactNode } from '@/utils/types';
import { GuestGuard } from '@/entities/auth/guard';

import AuthLayout from 'src/layouts/auth/auth.layout';

export default function LoginLayout({ children }: PropsReactNode) {
  return (
    <GuestGuard>
      <AuthLayout>{children}</AuthLayout>
    </GuestGuard>
  );
}
