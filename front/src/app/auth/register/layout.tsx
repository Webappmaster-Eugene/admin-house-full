'use client';

import { PropsReactNode } from 'src/utils/types';

import AuthLayout from 'src/layouts/auth/auth.layout';

export default function Layout({ children }: PropsReactNode) {
  return <AuthLayout>{children}</AuthLayout>;
}
