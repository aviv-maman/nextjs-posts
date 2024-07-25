import { Suspense } from 'react';
import SearchResultsGrid from '@/components/search-results-grid';
import SearchResultsGridSkeleton from '@/components/search-results-grid-skeleton';
import SearchResultsPagination from '@/components/search-results-pagination';
import { fetchGenericItemsPages } from '@/lib/items-data';

export const revalidate = 60;

export default async function SearchPage({ searchParams }: { searchParams?: { query?: string; page?: string } }) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const { data: totalPages } = await fetchGenericItemsPages({ query });

  return (
    <section className='container relative flex min-h-[calc(100vh-146px)] flex-col items-center justify-between gap-y-6 p-6 sm:min-h-[calc(100vh-138px)] sm:px-8'>
      <div className='flex w-full flex-col gap-y-6'>
        <h2
          title='Infinite Feed'
          className='w-fit self-center rounded border px-4 py-2 text-2xl font-bold tracking-tight'>
          Search Results
        </h2>
        <Suspense key={query + currentPage} fallback={<SearchResultsGridSkeleton />}>
          <SearchResultsGrid currentPage={currentPage} query={query} />
        </Suspense>
      </div>
      <SearchResultsPagination totalPages={totalPages} />
    </section>
  );
}
