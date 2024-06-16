'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { cookieKeys } from 'src/utils/const';

export async function logoutUser() {
  // Destroy the session
  redirect('/');
  cookies().delete(cookieKeys.REFRESH_KEY);
  cookies().delete(cookieKeys.USED_ACCESS_KEY);
}
