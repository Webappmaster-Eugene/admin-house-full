'use server';

import { AuthGuard, DashboardAccessGuard } from '@/entities/auth/guard';

import { PropsReactNode } from 'src/utils/types';

import DashboardGeneralLayout from 'src/layouts/dashboard/dashboard-general.layout';

export default async function DashboardLayout({ children }: PropsReactNode) {
  return (
    <AuthGuard>
      <DashboardAccessGuard>
        <DashboardGeneralLayout>{children}</DashboardGeneralLayout>
      </DashboardAccessGuard>
    </AuthGuard>
  );
}
