'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { lucia, validateRequest } from '@/lib/auth';

export const getSession = async () => {
  // NOTE: Here try-catch block is not good practice because at build time Next.js
  // can catch the error and know not to try and statically generate pages that
  // require a auth session.
  const validationResult = await validateRequest();
  if (!validationResult || !validationResult.session) {
    return { session: null, user: null, accounts: null };
  }
  return validationResult;
};

export const logout = async () => {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return redirect('/login');
};
