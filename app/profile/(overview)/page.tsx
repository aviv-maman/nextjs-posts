import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { LastItemsTable } from '@/components/last-items-table';
import { buttonVariants } from '@/components/ui/button';
import UserProfileCard from '@/components/user-profile-card';
import { authenticate } from '@/lib/auth/actions';
import { fetchItemQuantityByOwnerId } from '@/lib/items-data';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function ProfilePage() {
  const { user } = await authenticate();
  if (!user) redirect('/');
  const { totalItems } = await fetchItemQuantityByOwnerId({ ownerId: user.id });

  return (
    <div className='flex w-full flex-col self-center sm:container sm:max-w-3xl'>
      <main className='flex flex-1 flex-col gap-4 p-4'>
        <div className='flex items-center'>
          <h1 className='text-lg font-semibold md:text-2xl'>Profile</h1>
        </div>
        <UserProfileCard />
        <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
          <div className='flex flex-col items-center gap-1 p-4 text-center'>
            <h3 className='text-2xl font-bold tracking-tight'>Your Latest Items</h3>
            {(totalItems || 0) > 0 ? (
              <LastItemsTable userId={user.id} totalItems={totalItems} />
            ) : (
              <>
                <p className='text-sm text-muted-foreground'>No items found.</p>
                <Link href='/item/create' className={cn(buttonVariants({ variant: 'default' }), 'mt-2')}>
                  Add Item
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
