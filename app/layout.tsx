import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { GeistMono, GeistSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Next.js Template',
    template: '%s | Next.js Template',
  },
  description: 'This is my Next.js Template',
  metadataBase: new URL(process.env.BASE_URL!),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body
        className={cn('min-h-screen bg-background antialiased', {
          'debug-screens': process.env.NODE_ENV === 'development',
        })}>
        <Providers>{children}</Providers>
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
