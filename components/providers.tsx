'use client';

import { AuthProvider } from '@/components/auth-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useIsClient } from '@/hooks/use-is-client';

export function Providers({ children }: { children: React.ReactNode }) {
  const isClient = useIsClient();

  return isClient ? (
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  ) : null;
}
