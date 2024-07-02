'use server';

import { AuthGuard } from '@/entities/auth/guard';

import { PropsReactNode } from 'src/utils/types';

import DashboardGeneralLayout from 'src/layouts/dashboard/dashboard-general.layout';

export default async function DashboardLayout({ children }: PropsReactNode) {
  // await new Promise((resolve) => setTimeout(resolve, 10000));

  return (
    <AuthGuard>
      <DashboardGeneralLayout>{children}</DashboardGeneralLayout>
    </AuthGuard>
  );
}
