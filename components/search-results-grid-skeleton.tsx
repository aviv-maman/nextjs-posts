import SearchResultsCardSkeleton from '@/components/search-results-card-skeleton';

const SearchResultsGridSkeleton: React.FC = async () => {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {Array.from({ length: 6 }).map((item, index) => (
        <SearchResultsCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default SearchResultsGridSkeleton;
