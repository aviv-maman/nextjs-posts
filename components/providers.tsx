'use client';

import { AuthProvider } from '@/components/auth-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
