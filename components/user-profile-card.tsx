'use client';

import Link from 'next/link';
import UserProfileCardSkeleton from './user-profile-card-skeleton';
import { CalendarClock, CalendarDays, ID, Mail, UserPen, UserPentagon } from '@/assets/icons';
import { useAuth } from '@/components/auth-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { capitalizeFirstLetter } from '@/lib/utils';

const UserProfileCard: React.FC = () => {
  const { isLoading, user } = useAuth();

  return isLoading ? (
    <UserProfileCardSkeleton />
  ) : (
    <Card className='overflow-hidden'>
      <CardHeader className='flex flex-row items-start bg-muted/50 p-4 sm:p-6'>
        <div className='grid gap-0.5'>
          <CardTitle className='group flex items-center gap-2 text-xl md:text-2xl'>{user?.name}</CardTitle>
          <CardDescription>{capitalizeFirstLetter(user?.role || 'user')}</CardDescription>
        </div>
        {/* <div className='ml-auto flex items-center gap-1'>
          <Button size='sm' variant='outline' className='h-8 min-w-8 gap-1 p-0 sm:px-2'>
            <UserPen className='size-4' />
            <span className='sr-only sm:not-sr-only xl:whitespace-nowrap'>Edit</span>
          </Button>
        </div> */}
      </CardHeader>
      <CardContent className='p-6 text-sm'>
        <div className='grid gap-3'>
          <div className='font-semibold'>Personal Details</div>
          <dl className='grid gap-3'>
            <div className='flex items-center justify-between'>
              <dt className='flex items-center gap-1 text-muted-foreground'>
                <ID className='size-4' /> Full Name
              </dt>
              <dd>{user?.name}</dd>
            </div>
            <div className='flex items-center justify-between'>
              <dt className='flex items-center gap-1 text-muted-foreground'>
                <Mail className='size-4' />
                Email
              </dt>
              <dd>
                <Link href={`mailto:${user?.email}`}>{user?.email}</Link>
              </dd>
            </div>
            <div className='flex items-center justify-between'>
              <dt className='flex items-center gap-1 text-muted-foreground'>
                <UserPentagon className='size-4' /> Username
              </dt>
              <dd>@{user?.username}</dd>
            </div>
          </dl>
        </div>
        <Separator className='my-4' />
        <div className='grid gap-3'>
          <div className='font-semibold'>Account Information</div>
          <dl className='grid gap-3'>
            <div className='flex items-center justify-between'>
              <dt className='flex items-center gap-1 text-muted-foreground'>
                <CalendarClock className='size-4' /> Last Login
              </dt>
              <dd>{String(user?.lastLogin)}</dd>
            </div>
            <div className='flex items-center justify-between'>
              <dt className='flex items-center gap-1 text-muted-foreground'>
                <CalendarDays className='size-4' /> Member Since
              </dt>
              <dd>{String(user?.createdAt)}</dd>
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className='flex flex-row items-center border-t bg-muted/50 px-4 py-3 sm:px-6'>
        <div className='text-xs text-muted-foreground'>
          Last Update at <time dateTime='2024-01-01'>{String(user?.updatedAt)}</time>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserProfileCard;
