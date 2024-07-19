import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import UserProfileCard from '@/components/user-profile-card';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function ProfilePage() {
  return (
    <div className='flex flex-col'>
      <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
        <div className='flex items-center'>
          <h1 className='text-lg font-semibold md:text-2xl'>Profile</h1>
        </div>
        <UserProfileCard />
        <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
          <div className='flex flex-col items-center gap-1 p-4 text-center'>
            <h3 className='text-2xl font-bold tracking-tight'>Last Item</h3>
            <p className='text-sm text-muted-foreground'>No items found.</p>
            <Button className='mt-4'>Add Item</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
