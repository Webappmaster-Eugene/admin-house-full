'use client';

import { PropsReactNode } from '@/utils/types';
import { AuthGuard } from '@/entities/auth/guard';
import DashboardLayout from '@/layouts/dashboard';

export default function Layout({ children }: PropsReactNode) {
  // const user = await getCurrentUser();
  // if (!user) {
  //   redirect('/');
  //   return notFound();
  // }
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
