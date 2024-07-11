import { fakeDelay } from '@/lib/utils';

export const Feed: React.FC = async () => {
  const data = await fakeDelay(1500).then(async () => []);

  return data ? (
    <div id='feed-both' className='flex w-full flex-col overflow-hidden md:justify-evenly lg:flex-row'>
      <div id='feed-incomplete' className='mt-6 flex w-full flex-col items-center md:mr-3 md:min-w-[350px]'>
        <h2 title='Incomplete' className='rounded border px-4 py-2 text-center text-2xl font-bold tracking-tight'>
          Incomplete
        </h2>
      </div>
      <div id='feed-complete' className='mt-6 flex w-full flex-col items-center md:ml-3 md:min-w-[350px]'>
        <h2 title='Complete' className='rounded border px-4 py-2 text-center text-2xl font-bold tracking-tight'>
          Complete
        </h2>
      </div>
    </div>
  ) : (
    <div className='mt-10 flex w-full flex-col overflow-hidden md:justify-evenly lg:flex-row'>
      <h1 className='text-center'>Create your first item to get started</h1>
    </div>
  );
};
