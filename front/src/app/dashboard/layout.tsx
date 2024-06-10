'use client';

import { AuthGuard } from '@/shared/auth/guard';
import DashboardLayout from '@/widgets/dashboard';

import { PropsReactNode } from 'src/shared/utils/types/react-node.type';

export default function Layout({ children }: PropsReactNode) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
