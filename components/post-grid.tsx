import PostCard from '@/components/post-card';
import { fetchGenericItems } from '@/lib/items/data';

interface PostGridProps {}

const PostGrid: React.FC<PostGridProps> = async (props) => {
  const { data: latestItems } = await fetchGenericItems();

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
      <PostCard value={latestItems?.[0]} withImage />
      <div className='flex flex-col justify-between'>
        {latestItems?.slice(1, 4).map((item, index) => <PostCard key={index} value={item} />)}
      </div>
      <PostCard value={latestItems?.[4]} withImage />
      <div>
        <PostCard value={latestItems?.[5]} />
      </div>
    </div>
  );
};

export default PostGrid;
