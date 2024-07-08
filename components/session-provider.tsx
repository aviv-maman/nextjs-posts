'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { validateRequest } from '@/lib/auth';
import { getSession } from '@/lib/helpers';

/**
 * Returns the number of seconds elapsed since January 1, 1970 00:00:00 UTC.
 */
function now() {
  return Math.floor(Date.now() / 1000);
}

const SessionContext = createContext({
  session: null as Awaited<ReturnType<typeof validateRequest>>['session'],
  user: null as Awaited<ReturnType<typeof validateRequest>>['user'],
  accounts: null as Awaited<ReturnType<typeof validateRequest>>['accounts'],
  isLoading: false,
  error: null as Error | null,
});

interface SessionProviderProps {
  children: Readonly<React.ReactNode>;
  session?: Awaited<ReturnType<typeof validateRequest>>['session'] | null;
}
export function SessionProvider({ children, session = null }: SessionProviderProps) {
  if (!SessionContext) {
    throw new Error('React Context is unavailable in Server Components');
  }

  const hasInitialSession = session !== null;

  const initialState = {
    /** If session was passed, initialize as not loading */
    isLoading: !hasInitialSession,
    lastSync: hasInitialSession ? now() : 0,
    session,
    user: null as Awaited<ReturnType<typeof validateRequest>>['user'] | null,
    accounts: null as Awaited<ReturnType<typeof validateRequest>>['accounts'] | null,
    error: null as Error | null,
  };

  const [contextState, setContextState] = useState(initialState);

  useEffect(() => {
    setContextState((prevState) => ({ ...prevState, isLoading: true, error: null }));
    try {
      if (now() < contextState.lastSync || !contextState.session) {
        // Return early if the client session is not initialized yet
        return;
      }
      // An event or session staleness occurred, update the client session.
      setContextState((prevState) => ({ ...prevState, lastSync: now() }));
      getSession().then((res) => {
        setContextState((prevState) => ({
          ...prevState,
          session: res.session,
          user: res.user,
          accounts: res.accounts,
        }));
      });
    } catch (error) {
      console.error((error as Error).name, (error as Error).message);
      setContextState((prevState) => ({ ...prevState, error: error as Error }));
    } finally {
      setContextState((prevState) => ({ ...prevState, isLoading: false }));
    }
  }, []);

  const value = useMemo(
    () => ({
      session: contextState.session,
      user: contextState.user,
      accounts: contextState.accounts,
      isLoading: contextState.isLoading,
      error: contextState.error,
    }),
    [contextState.session, contextState.user, contextState.accounts, contextState.isLoading, contextState.error],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

/**`Client Only`
 *
 * Validates the current session and returns the associated user, its session and its linked accounts if the session is valid.
 * Otherwise, returns null for all.
 *
 * ##### Example:
 * ```ts
 * import { redirect } from 'next/navigation';
 * import { lucia, validateRequest } from '@/lib/auth';
 *
 * export default async function Page() {
 * const { session, user, accounts, isLoading, error } = useSession();

 * if (isLoading) {
 *    return <div>Loading...</div>;
 * }

 *  return (
 *    <div className='flex flex-col items-start gap-y-10'>
 *      {session && (
 *        <div>
 *          <h1>Hi, {user?.username}!</h1>
 *          <p>Your last login was on {String(user?.lastLogin)}.</p>
 *        </div>
 *      )}
 *    </div>
 *   );
 * }
 * ```
 *
 * */
export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) throw new Error('useSession was used outside of <SessionProvider />');
  return context;
};
