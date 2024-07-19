import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';
import { GitHub } from 'arctic';
import { Lucia } from 'lucia';
import type { User as LuciaUser, Session } from 'lucia';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { db } from './db';
import type { DatabaseAccount, DatabasePermission, DatabaseUser } from './db';

const adapter = new BetterSqlite3Adapter(db, {
  user: 'user',
  session: 'session',
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      email: attributes.email,
      emailVerified: attributes.email_verified,
      name: attributes.name,
      imageUrl: attributes.image_url,
      createdAt: attributes.created_at,
      lastLogin: attributes.last_login,
      updatedAt: attributes.updated_at,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<DatabaseUser, 'id'>;
  }
}

export interface User extends LuciaUser {
  // permissions: {
  //subject: 'generic_item' | 'advanced_item';
  //actions: { create?: 0 | 1; read: 0 | 1; update?: 0 | 1; delete?: 0 | 1 };
  // };
  role: Omit<DatabasePermission, 'user_id'>['role'];
}
export interface Account extends Omit<DatabaseAccount, 'provider_user_id'> {}

interface Permission extends Omit<DatabasePermission, 'user_id'> {}
/**`Server Only`
 *
 * Validates the current session and returns the associated user and its session if the session is valid. Otherwise, returns null for both.
 *
 * ##### Example:
 * ```ts
 * import { redirect } from 'next/navigation';
 * import { lucia, validateRequest } from '@/lib/auth';
 *
 * export default async function Page() {
 *  const { user } = await validateRequest();
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
export const validateRequest = cache(
  async (): Promise<
    | {
        user: User;
        session: Session;
        accounts: Account[];
      }
    | { user: User; session: Session; accounts: null }
    | { user: null; session: null; accounts: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

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
      const existingAccounts = db
        .prepare('SELECT provider_name, user_id FROM oauth_account WHERE user_id = ?')
        .all(validationResult?.session?.userId) as Account[] | undefined;
      requestResult.accounts = existingAccounts || null;

      const permission = db
        .prepare('SELECT role FROM permission WHERE user_id = ?')
        .get(validationResult?.session?.userId) as Permission | undefined;
      requestResult.user.role = permission?.role || 'user';

      if (validationResult.session && validationResult.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(validationResult.session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      }
      if (!validationResult.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      }
    } catch (error) {
      // Next.js throws an error when you attempt to set a cookie upon page rendering
      throw error;
    }

    return requestResult;
  },
);

export const github = new GitHub(process.env.GITHUB_CLIENT_ID!, process.env.GITHUB_CLIENT_SECRET!);
