'use client';

import { PropsReactNode } from 'src/utils/types';
import { GuestGuard } from 'src/utils/auth/guard';

import AuthLayout from 'src/layouts/auth/auth.layout';

export default function Layout({ children }: PropsReactNode) {
  return (
    <GuestGuard>
      <AuthLayout>{children}</AuthLayout>
    </GuestGuard>
  );
}
