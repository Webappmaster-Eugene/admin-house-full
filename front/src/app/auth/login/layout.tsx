'use client';

import { GuestGuard } from '@/shared/auth/guard';
import AuthClassicLayout from '@/widgets/auth/classic';
import { Props } from '@/shared/utils/types/react-node.type';

export default function Layout({ children }: Props) {
  return (
    <GuestGuard>
      <AuthClassicLayout>{children}</AuthClassicLayout>
    </GuestGuard>
  );
}
