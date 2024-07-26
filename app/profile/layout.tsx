import { redirect } from 'next/navigation';
import SideNav from '@/components/side-nav';
import { validateRequest } from '@/lib/auth';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { user } = await validateRequest();
  if (!user) redirect('/');

  return (
    <div id='profile-layout' className='flex-row sm:flex'>
      <SideNav />
      <div className='flex min-h-[calc(100vh-195px)] w-full flex-col sm:min-h-[calc(100vh-138px)] md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
        {children}
      </div>
    </div>
  );
}
