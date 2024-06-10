'use client';

import { GuestGuard } from '@/shared/auth/guard';

import { PropsReactNode } from 'src/shared/utils/types/react-node.type';
import { AuthGeneralLayout } from 'src/widgets/auth/auth-general-layout';

export default function Layout({ children }: PropsReactNode) {
  return (
    <GuestGuard>
      <AuthGeneralLayout title="House Admin - удобный сервис для составления смет (регистрация)">
        {children}
      </AuthGeneralLayout>
    </GuestGuard>
  );
}
