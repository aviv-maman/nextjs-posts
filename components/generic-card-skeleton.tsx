import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const GenericCardSkeleton: React.FC<React.ComponentPropsWithoutRef<'div'>> = (props) => {
  return (
    <div className={cn('w-full rounded-md', props.className)} {...props}>
      <Skeleton className='aspect-video size-full rounded-b-none rounded-t-md' />
      <div className='flex items-center space-x-2 border-x p-4 text-base'>
        <Skeleton className='size-10 rounded-full' />
        <div className='flex flex-col space-y-2'>
          <Skeleton className='h-5 w-28 rounded-md' />
          <Skeleton className='h-3 w-32 rounded-md' />
        </div>
      </div>
      <div className='space-y-2 border-x p-4 pt-0'>
        <Skeleton className='h-7 w-4/5 rounded-md' />
        <Skeleton className='h-32 w-full rounded-md' />
      </div>
      <div className='h-auto w-full rounded-b-md border p-4'>
        <div className='flex h-full flex-col justify-between space-y-4'>
          <Skeleton className='h-4 w-48 rounded-md' />
        </div>
      </div>
    </div>
  );
};

export default GenericCardSkeleton;
