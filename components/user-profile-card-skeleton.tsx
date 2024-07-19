import { CalendarClock, CalendarDays, ID, Mail, UserPentagon } from '@/assets/icons';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const UserProfileCardSkeleton: React.FC = () => {
  return (
    <Card className='overflow-hidden'>
      <CardHeader className='flex flex-row items-start bg-muted/50 p-4 sm:p-6'>
        <div className='w-full space-y-2'>
          <Skeleton className='h-6 w-2/5 rounded-md' />
          <Skeleton className='h-[18px] w-16 rounded-md' />
        </div>
      </CardHeader>
      <CardContent className='p-6 text-sm'>
        <div className='grid gap-3'>
          <div className='font-semibold'>Personal Details</div>
          <dl className='grid gap-3'>
            <div className='flex items-center justify-between'>
              <dt className='flex items-center gap-1 text-muted-foreground'>
                <ID className='size-4' /> Full Name
              </dt>
              <dd>
                <Skeleton className='h-4 w-32 rounded-md' />
              </dd>
            </div>
            <div className='flex items-center justify-between'>
              <dt className='flex items-center gap-1 text-muted-foreground'>
                <Mail className='size-4' />
                Email
              </dt>
              <dd>
                <Skeleton className='h-4 w-40 rounded-md' />
              </dd>
            </div>
            <div className='flex items-center justify-between'>
              <dt className='flex items-center gap-1 text-muted-foreground'>
                <UserPentagon className='size-4' /> Username
              </dt>
              <dd>
                <Skeleton className='h-4 w-24 rounded-md' />
              </dd>
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
              <dd>
                <Skeleton className='h-4 w-32 rounded-md' />
              </dd>
            </div>
            <div className='flex items-center justify-between'>
              <dt className='flex items-center gap-1 text-muted-foreground'>
                <CalendarDays className='size-4' /> Member Since
              </dt>
              <dd>
                <Skeleton className='h-4 w-32 rounded-md' />
              </dd>
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className='flex flex-row items-center border-t bg-muted/50 px-4 py-3 sm:px-6'>
        <div className='flex min-h-4 items-center text-xs text-muted-foreground'>
          <Skeleton className='h-3 w-52 rounded-md' />
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserProfileCardSkeleton;
