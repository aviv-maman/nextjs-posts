import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonDemo() {
  return (
    <section className='flex w-min flex-col gap-y-4'>
      <div className='flex items-center space-x-4'>
        <Skeleton className='size-12 rounded-full' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-[250px]' />
          <Skeleton className='h-4 w-[200px]' />
        </div>
      </div>

      <div className='flex flex-col space-y-3'>
        <Skeleton className='h-[125px] w-[250px] rounded-xl' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-[250px]' />
          <Skeleton className='h-4 w-[200px]' />
        </div>
      </div>
    </section>
  );
}
