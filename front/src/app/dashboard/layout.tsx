'use client';

import { PropsReactNode } from 'src/utils/types';

import DashboardLayout from 'src/layouts/dashboard';

export default function Layout({ children }: PropsReactNode) {
  // const user = await getCurrentUser();
  // if (!user) {
  //   redirect('/');
  //   return notFound();
  // }
  return (
    // <AuthGuard>
    <DashboardLayout>{children}</DashboardLayout>
    // </AuthGuard>
  );
}
