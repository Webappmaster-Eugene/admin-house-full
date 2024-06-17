'use server';

import { cookies } from 'next/headers';

import { cookieKeys } from 'src/utils/const';
import { redirect } from 'next/navigation';

export async function logoutUser() {
  // Destroy the session
  cookies().delete(cookieKeys.REFRESH_KEY);
  cookies().delete(cookieKeys.USED_ACCESS_KEY);
  redirect('/');
}
