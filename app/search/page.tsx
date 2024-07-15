'use server';

import { Suspense } from 'react';
import FeedWrapperSkeleton from '@/components/feed-wrapper-skeleton';
import SearchResultsCard from '@/components/search-results-card';
import mockData from '@/mock_data.json';

export default async function SearchPage() {
  const items = mockData;

  return (
    <section className='container relative flex min-h-[calc(100vh-150px)] flex-col items-center gap-y-6 p-6 sm:min-h-[calc(100vh-142px)] sm:px-8'>
      <h2 title='Infinite Feed' className='rounded border px-4 py-2 text-center text-2xl font-bold tracking-tight'>
        Search Results
      </h2>
      <Suspense fallback={<FeedWrapperSkeleton />}>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {[...items, ...items].map((item, index) => (
            <SearchResultsCard key={`${item.id}-${index}`} value={item} />
          ))}
        </div>
      </Suspense>
    </section>
  );
}
