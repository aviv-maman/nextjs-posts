'use server';

import FeedBlock from '@/components/feed-block';
import type { GenericItem } from '@/components/generic-card';

export const Feed: React.FC = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/external/feed`, { cache: 'no-cache' });
  const { data } = (await response.json()) as { total: number; data: GenericItem[]; message: string };

  return data ? (
    <div id='feed-block' className='flex w-96 flex-col sm:w-[28rem]'>
      <FeedBlock data={data} />
    </div>
  ) : (
    <div className='mt-10 flex w-full flex-col overflow-hidden md:justify-evenly lg:flex-row'>
      <h1 className='text-center'>Create your first item to get started</h1>
    </div>
  );
};
