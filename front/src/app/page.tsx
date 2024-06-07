'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PATH_AFTER_LOGIN } from '@/shared/config-global';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push(PATH_AFTER_LOGIN);
  }, [router]);

  return null;
}
