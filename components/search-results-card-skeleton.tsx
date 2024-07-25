import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const SearchResultsCardSkeleton: React.FC<React.ComponentPropsWithoutRef<'div'>> = (props) => {
  return (
    <div className={cn('flex w-full flex-col gap-y-4 rounded-md border p-4', props.className)} {...props}>
      <div className='p-0'>
        <div className='flex items-center space-x-2 text-base'>
          <Skeleton className='size-10 rounded-full' />
          <div className='flex flex-col space-y-2'>
            <Skeleton className='h-5 w-28 rounded-md' />
            <Skeleton className='h-3 w-36 rounded-md' />
          </div>
        </div>
      </div>
      <Skeleton className='aspect-video size-full rounded-md' />
      <div className='min-h-16 space-y-2'>
        <Skeleton className='h-7 w-4/5 rounded-md' />
        <Skeleton className='h-7 w-3/5 rounded-md' />
      </div>
      <div className='flex flex-wrap gap-2'>
        {Array.from({ length: 3 }).map((tag, index) => (
          <Skeleton key={index} className='h-6 w-12' />
        ))}
      </div>
    </div>
  );
};

export default SearchResultsCardSkeleton;
