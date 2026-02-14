'use server';

import type { Session } from 'lucia';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import type { Account, Permission, User } from '@/lib/auth/config';
import { lucia } from '@/lib/auth/config';
import { sql } from '@/lib/db';

/**`Server Only`
 *
 * Validates the current session and returns the associated user and its session if the session is valid. Otherwise, returns null for both.
 *
 * ##### Example:
 * ```ts
 * import { redirect } from 'next/navigation';
 * import { lucia, authenticate } from '@/lib/auth';
 *
 * export default async function Page() {
 *  const { user } = await authenticate();
 *
 *  if (!user) {
 *    return redirect('/login');
 *  }
 *
 *  return (
 *   <div>
 *    <h1>Hi, {user.username}!</h1>
 *    <p>
 *      {user.name}, your last login was on {String(user.lastLogin)}.
 *    </p>
 *    <form action={logout}>
 *     <button>Sign out</button>
 *    </form>
 *   </div>
 *   );
 * }
 * ```
 *
 * */
export const authenticate = cache(
  async (): Promise<
    | {
        user: User;
        session: Session;
        accounts: Account[];
      }
    | { user: User; session: Session; accounts: null }
    | { user: null; session: null; accounts: null }
  > => {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) {
      return { user: null, session: null, accounts: null };
    }

    const validationResult = await lucia.validateSession(sessionId);
    const requestResult = { ...validationResult, accounts: null } as {
      user: User;
      accounts: Account[] | null;
      session: Session;
    };

    try {
      const existingAccounts = (await sql`
        SELECT provider_name, user_id FROM oauth_accounts
        WHERE user_id = ${validationResult?.session?.userId}`) as Account[] | undefined;
      requestResult.accounts = existingAccounts || null;
      const permissions = (await sql`
      SELECT role FROM permissions
      WHERE user_id = ${validationResult?.session?.userId}`) as Permission[] | undefined;
      requestResult.user.role = permissions?.[0].role || 'user';
      if (validationResult.session && validationResult.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(validationResult.session.id);
        (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      }
      if (!validationResult.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      }
    } catch (error) {
      // Next.js throws an error when you attempt to set a cookie upon page rendering
      throw error;
    }

    return requestResult;
  },
);

export const revokeSession = async (): Promise<{ error: Error } | void> => {
  const { session } = await authenticate();

  if (!session) {
    return { error: new Error('Unauthorized') };
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  revalidatePath('/', 'layout');
  redirect('/');
};

export const validateProtectedRoute = async ({
  role,
  redirectUrl,
}: {
  role: Omit<User, 'user_id'>['role'] | 'guest';
  redirectUrl: string;
}) => {
  const res = await authenticate();
  if (
    (res.user && role === 'guest') ||
    (!res.user && role !== 'guest') ||
    (role === 'admin' && res.user?.role !== 'admin')
  ) {
    redirect(redirectUrl);
  }
  return res;
};
