'use client';

import { GuestGuard } from '@/shared/auth/guard';
import { PropsReactNode } from '@/shared/utils/types/react-node.type';

import { AuthGeneralLayout } from 'src/widgets/auth';

export default function Layout({ children }: PropsReactNode) {
  return (
    <GuestGuard>
      <div />
      <AuthGeneralLayout>{children}</AuthGeneralLayout>
    </GuestGuard>
  );
}
