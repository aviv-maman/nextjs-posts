'use server';

import { revalidatePath } from 'next/cache';
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

export const clearSession = async (): Promise<{ error: Error } | void> => {
  const { session } = await validateRequest();
  if (!session) {
    return { error: new Error('Unauthorized') };
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  revalidatePath('/', 'layout');
  redirect('/');
};
