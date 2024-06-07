'use client';

import { GuestGuard } from '@/shared/auth/guard';
import AuthClassicLayout from '@/widgets/auth/classic';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <GuestGuard>
      <AuthClassicLayout title="House Admin - удобный сервис для составления смет (регистрация)">
        {children}
      </AuthClassicLayout>
    </GuestGuard>
  );
}
