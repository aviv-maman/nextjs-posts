'use client';

import { AuthProvider } from '@/components/auth-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useIsClient } from '@/hooks/use-is-client';
import type { authenticate } from '@/lib/auth/actions';

export function Providers({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: Awaited<ReturnType<typeof authenticate>>;
}) {
  const isClient = useIsClient();

  return isClient ? (
    <AuthProvider auth={auth}>
      <ThemeProvider>
        <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  ) : null;
}
