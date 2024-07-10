'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { type User, lucia, validateRequest } from '@/lib/auth';

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

// export const verifySession = async () => {
//   const result = await getSession();

//   if (!result.session) {
//     redirect('/login');
//   }

//   return result;
// };

// export const verifyPermissions = async (permissions: User['permissions']) => {
//   const dbPermissions = (await verifySession()).user?.permissions;
//   if (dbPermissions) {
//     for (const key in permissions.actions) {
//       if (permissions.actions.hasOwnProperty(key) && dbPermissions.hasOwnProperty(key)) {
//         //@ts-expect-error TO FIX
//         if (permissions.actions?.[key] !== dbPermissions.actions?.[key]) return false;
//       }
//     }
//     return true;
//   }
//   return false;
// };

export const validateProtectedRoute = async ({
  role,
  redirectUrl,
}: {
  role: Omit<User, 'user_id'>['role'] | 'guest';
  redirectUrl: string;
}) => {
  //const user = (await verifySession()).user;
  const res = await getSession();
  if (
    (res.user && role === 'guest') ||
    (!res.user && role !== 'guest') ||
    (role === 'admin' && res.user?.role !== 'admin')
  ) {
    redirect(redirectUrl);
  }
  return res;
};
