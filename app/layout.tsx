import type { Metadata } from 'next';
import Footer from '@/components/footer';
import { Header } from '@/components/header';
import { Providers } from '@/components/providers';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { authenticate } from '@/lib/auth/actions';
import { GeistMono, GeistSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Next.js Posts',
    template: '%s | Next.js Posts',
  },
  description: 'A Next.js blog with a focus on performance and accessibility.',
  metadataBase: new URL(process.env.BASE_URL!),
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const auth = await authenticate();

  return (
    <html lang='en' suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body
        className={cn('min-h-screen bg-background antialiased', {
          'debug-screens': process.env.NODE_ENV === 'development',
        })}>
        <Providers auth={auth}>
          <Header />
          <main className='min-h-[calc(100vh-154px)] animate-in sm:min-h-[calc(100vh-146px)]'>{children}</main>
          <Footer />
        </Providers>
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
