'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { authenticate } from '@/lib/auth/actions';
import { revokeSession } from '@/lib/auth/actions';

type AuthProviderState =
  | {
      isLoading: boolean;
      session: Awaited<ReturnType<typeof authenticate>>['session'];
      user: Awaited<ReturnType<typeof authenticate>>['user'];
      accounts: Awaited<ReturnType<typeof authenticate>>['accounts'];
      error: Error | null;
      logout: () => Promise<void>;
    }
  | undefined;

const AuthContext = createContext<AuthProviderState>(undefined);

interface AuthProviderProps {
  children: Readonly<React.ReactNode>;
  auth: Awaited<ReturnType<typeof authenticate>>;
}
export function AuthProvider({ children, auth }: AuthProviderProps) {
  if (!AuthContext) {
    throw new Error('React Context is unavailable in Server Components');
  }

  const initialState: AuthProviderState = {
    isLoading: auth ? false : true,
    session: auth.session,
    user: auth.user,
    accounts: auth.accounts,
    error: null,
    logout: async () => {},
  };

  const [contextState, setContextState] = useState(initialState);

  const logout = useCallback(async () => {
    setContextState((prevState) => ({ ...prevState, isLoading: true, error: null }));
    try {
      const res = await revokeSession();
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
 *
 * if (isLoading) {
 *    return <div>Loading...</div>;
 * }
 *
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
