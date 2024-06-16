'use server';

import { NextRequest, NextResponse } from 'next/server';

export async function updateSessionOld(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  // const parsed = await decrypt(session);
  // parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  // refresh the session
  // res.cookies.set({
  //   name: 'session',
  //   // value: await encrypt(parsed),
  //   httpOnly: true,
  //   // expires: parsed.expires,
  // });
  // return res;
}
