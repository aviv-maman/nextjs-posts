'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { validateRequest } from '@/lib/auth';
import { getSession } from '@/lib/helpers';

type SessionProviderState =
  | {
      isLoading: boolean;
      session: Awaited<ReturnType<typeof validateRequest>>['session'];
      user: Awaited<ReturnType<typeof validateRequest>>['user'];
      accounts: Awaited<ReturnType<typeof validateRequest>>['accounts'];
      error: Error | null;
    }
  | undefined;

const SessionContext = createContext<SessionProviderState>(undefined);

interface SessionProviderProps {
  children: Readonly<React.ReactNode>;
  session?: Awaited<ReturnType<typeof validateRequest>>['session'] | null;
}
export function SessionProvider({ children, session = null }: SessionProviderProps) {
  if (!SessionContext) {
    throw new Error('React Context is unavailable in Server Components');
  }

  const hasInitialSession = session !== null;

  const initialState: SessionProviderState = {
    /** If session was passed, initialize as not loading */
    isLoading: !hasInitialSession,
    session,
    user: null,
    accounts: null,
    error: null,
  };

  const [contextState, setContextState] = useState(initialState);

  // const getCachedSession = useCallback(async () => {
  //   const newContextState = await getSession();
  //   const { session, user, accounts } = newContextState;
  //   setContextState((prevState) => ({ ...prevState, session, user, accounts }));
  // }, []);

  const getCachedSession = useCallback(async () => {
    return await getSession();
  }, []);

  useEffect(() => {
    let ignore = false;
    setContextState((prevState) => ({ ...prevState, isLoading: true, error: null }));
    try {
      getCachedSession().then((res) => {
        const { session, user, accounts } = res;
        if (!ignore) {
          setContextState((prevState) => ({ ...prevState, session, user, accounts }));
        }
      });
    } catch (error) {
      console.error((error as Error).name, (error as Error).message);
      setContextState((prevState) => ({ ...prevState, error: error as Error }));
    } finally {
      setContextState((prevState) => ({ ...prevState, isLoading: false }));
    }
    return () => {
      ignore = true;
    };
  }, [getCachedSession]);

  const contextValue = useMemo(
    () => ({
      session: contextState.session,
      user: contextState.user,
      accounts: contextState.accounts,
      isLoading: contextState.isLoading,
      error: contextState.error,
    }),
    [contextState],
  );

  return <SessionContext.Provider value={contextValue}>{children}</SessionContext.Provider>;
}

/**`Client Only`
 *
 * Validates the current session and returns the associated user, its session and its linked accounts if the session is valid.
 * Otherwise, returns null for all.
 *
 * ##### Example:
 * ```ts
 * import { useSession } from '@/components/session-provider';
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
