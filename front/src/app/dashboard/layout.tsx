'use client';

import { AuthGuard } from '@/shared/auth/guard';
import DashboardLayout from '@/widgets/dashboard';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
