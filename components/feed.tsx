'use server';

import GenericCard from '@/components/generic-card';
import { fakeDelay } from '@/lib/utils';
import mockData from '@/mock_data.json';

export const Feed: React.FC = async () => {
  const data = await fakeDelay(5000).then(async () => mockData);

  return data ? (
    <div id='feed-block' className='flex w-full flex-col'>
      <h2 title='Complete' className='rounded border px-4 py-2 text-center text-2xl font-bold tracking-tight'>
        General Feed
      </h2>
      {data.map((item) => (
        <GenericCard key={item.id} value={item} className='mt-6' />
      ))}
    </div>
  ) : (
    <div className='mt-10 flex w-full flex-col overflow-hidden md:justify-evenly lg:flex-row'>
      <h1 className='text-center'>Create your first item to get started</h1>
    </div>
  );
};
