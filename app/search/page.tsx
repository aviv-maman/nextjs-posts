'use server';

import { Suspense } from 'react';
import FeedWrapperSkeleton from '@/components/feed-wrapper-skeleton';
import SearchResultsCard from '@/components/search-results-card';
import SearchResultsPagination from '@/components/search-results-pagination';
import { fetchGenericItems, fetchGenericItemsPages } from '@/lib/items-data';

export default async function SearchPage({ searchParams }: { searchParams?: { query?: string; page?: string } }) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const { data: genericItems } = await fetchGenericItems({ currentPage, query });
  const { data: totalPages } = await fetchGenericItemsPages({ query });

  return (
    <section className='container relative flex min-h-[calc(100vh-146px)] flex-col items-center justify-between gap-y-6 p-6 sm:min-h-[calc(100vh-138px)] sm:px-8'>
      <div className='flex w-full flex-col gap-y-6'>
        <h2
          title='Infinite Feed'
          className='w-fit self-center rounded border px-4 py-2 text-2xl font-bold tracking-tight'>
          Search Results
        </h2>
        <Suspense key={query + currentPage} fallback={<FeedWrapperSkeleton />}>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {genericItems?.map((item, index) => <SearchResultsCard key={`${item.id}-${index}`} value={item} />)}
          </div>
        </Suspense>
      </div>
      <SearchResultsPagination totalPages={totalPages} currentPage={currentPage} />
    </section>
  );
}
