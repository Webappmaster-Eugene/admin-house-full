'use client';

import { GuestGuard } from '@/entities/auth/guard';

import { PropsReactNode } from 'src/utils/types';

import AuthLayout from 'src/layouts/auth/auth.layout';

export default function Layout({ children }: PropsReactNode) {
  return (
    <GuestGuard>
      <AuthLayout>{children}</AuthLayout>
    </GuestGuard>
  );
}
