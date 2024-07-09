'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { clearSession, getSession } from '@/lib/actions';
import type { validateRequest } from '@/lib/auth';

type AuthProviderState =
  | {
      isLoading: boolean;
      session: Awaited<ReturnType<typeof validateRequest>>['session'];
      user: Awaited<ReturnType<typeof validateRequest>>['user'];
      accounts: Awaited<ReturnType<typeof validateRequest>>['accounts'];
      error: Error | null;
      logout: () => Promise<void>;
    }
  | undefined;

const AuthContext = createContext<AuthProviderState>(undefined);

interface AuthProviderProps {
  children: Readonly<React.ReactNode>;
  session?: Awaited<ReturnType<typeof validateRequest>>['session'] | null;
}
export function AuthProvider({ children, session = null }: AuthProviderProps) {
  if (!AuthContext) {
    throw new Error('React Context is unavailable in Server Components');
  }

  const hasInitialSession = session !== null;

  const initialState: AuthProviderState = {
    /** If session was passed, initialize as not loading */
    isLoading: !hasInitialSession,
    session,
    user: null,
    accounts: null,
    error: null,
    logout: async () => {},
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

  const logout = useCallback(async () => {
    setContextState((prevState) => ({ ...prevState, isLoading: true, error: null }));
    try {
      const res = await clearSession();
      const err = res && res.error ? res.error : null;
      if (err) {
        setContextState((prevState) => ({ ...prevState, error: err }));
      } else {
        setContextState((prevState) => ({ ...prevState, session: null, user: null, accounts: null }));
      }
    } catch (error) {
      console.error((error as Error).name, (error as Error).message);
      setContextState((prevState) => ({ ...prevState, error: error as Error }));
    } finally {
      setContextState((prevState) => ({ ...prevState, isLoading: false }));
    }
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
      ...contextState,
      logout,
    }),
    [contextState, logout],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

/**`Client Only`
 *
 * Validates the current session and returns the associated user, its session and its linked accounts if the session is valid.
 * Otherwise, returns null for all.
 *
 * ##### Example:
 * ```ts
 * import { useAuth } from '@/components/auth-provider';
 *
 * export default async function Page() {
 * const { session, user, accounts, isLoading, error } = useAuth();

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
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth was used outside of <AuthProvider />');
  return context;
};
