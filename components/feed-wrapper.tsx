'use server';

import FeedBlock from '@/components/feed-block';
import { fetchGenericItems } from '@/lib/items-data';

const FeedWrapper: React.FC = async () => {
  const { data } = await fetchGenericItems({});

  return data ? (
    <div id='feed-block' className='flex w-full max-w-96 flex-col sm:max-w-md'>
      <FeedBlock data={data} />
    </div>
  ) : (
    <div className='mt-10 flex w-full flex-col overflow-hidden md:justify-evenly lg:flex-row'>
      <h1 className='text-center'>Create your first item to get started</h1>
    </div>
  );
};

export default FeedWrapper;
