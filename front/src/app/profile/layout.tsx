'use server';

import { PropsReactNode } from '@/utils/types';
import { AuthGuard } from '@/entities/auth/guard';

import DashboardLayout from 'src/layouts/dashboard/dashboard-general.layout';

export default async function ProfileLayout({ children }: PropsReactNode) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
