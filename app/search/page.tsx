'use server';

import { Suspense } from 'react';
import FeedWrapper from '@/components/feed-wrapper';
import FeedWrapperSkeleton from '@/components/feed-wrapper-skeleton';

export default async function SearchPage() {
  return (
    <section className='container relative flex min-h-[calc(100vh-150px)] flex-col items-center p-6 sm:min-h-[calc(100vh-142px)] sm:px-8'>
      {/* <h2 title='Infinite Feed' className='rounded border px-4 py-2 text-center text-2xl font-bold tracking-tight'>
        Search Results
      </h2>
      <Suspense fallback={<FeedWrapperSkeleton />}>
        <FeedWrapper />
      </Suspense> */}
    </section>
  );
}
