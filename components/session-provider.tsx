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
  session: null as Awaited<ReturnType<typeof validateRequest>>['session'] | undefined,
  user: null as Awaited<ReturnType<typeof validateRequest>>['user'],
  accounts: null as Awaited<ReturnType<typeof validateRequest>>['accounts'],
  isLoading: false,
  error: null as Error | null,
});

interface SessionProviderProps {
  children: Readonly<React.ReactNode>;
  session?: Awaited<ReturnType<typeof validateRequest>>['session'] | null;
}
export function SessionProvider(props: SessionProviderProps) {
  if (!SessionContext) {
    throw new Error('React Context is unavailable in Server Components');
  }

  const hasInitialSession = props.session !== undefined;

  const initialState = {
    isLoading: !hasInitialSession,
    lastSync: hasInitialSession ? now() : 0,
    session: props.session,
    user: null,
    accounts: null,
    error: null,
  };

  const [session, setSession] = useState(() => {
    if (hasInitialSession) return props.session;
  });

  const [user, setUser] = useState<Awaited<ReturnType<typeof validateRequest>>['user'] | null>(null);
  const [accounts, setAccounts] = useState<Awaited<ReturnType<typeof validateRequest>>['accounts'] | null>(null);

  /** If session was passed, initialize as not loading */
  const [isLoading, setIsLoading] = useState(initialState.isLoading);

  const [lastSync, setLastSync] = useState(initialState.lastSync);

  const [error, setError] = useState<Error | null>(initialState.error);

  useEffect(() => {
    setIsLoading(() => true);
    setError(() => null);
    try {
      if (now() < lastSync || !session) {
        // Return early if the client session is not initialized yet
        return;
      }
      // An event or session staleness occurred, update the client session.
      setLastSync(() => now());
      getSession().then((res) => {
        setSession(() => res.session), setUser(() => res.user), setAccounts(() => res.accounts);
      });
    } catch (error) {
      console.error((error as Error).name, (error as Error).message);
      setError(() => error as Error);
    } finally {
      setIsLoading(() => false);
    }
  }, []);

  const value = useMemo(
    () => ({
      session,
      user,
      accounts,
      isLoading,
      error,
    }),
    [session, user, accounts, isLoading, error],
  );

  return <SessionContext.Provider value={value}>{props.children}</SessionContext.Provider>;
}

export const useSession = () => useContext(SessionContext);
