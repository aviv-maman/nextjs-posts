import SearchResultsCard from '@/components/search-results-card';
import { fetchGenericItems } from '@/lib/items-data';

interface SearchResultsGridProps {
  query: string;
  currentPage: number;
}

const SearchResultsGrid: React.FC<SearchResultsGridProps> = async ({ query, currentPage }) => {
  const { data: genericItems } = await fetchGenericItems({ query, currentPage });

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {genericItems?.map((item, index) => <SearchResultsCard key={`${item.id}-${index}`} value={item} />)}
    </div>
  );
};

export default SearchResultsGrid;
