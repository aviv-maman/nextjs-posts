import GenericCardSkeleton from '@/components/generic-card-skeleton';

const FeedBlockSkeleton: React.FC = () => {
  return (
    <div id='feed-block-skeleton' className='flex w-96 flex-col sm:w-[28rem]'>
      {Array.from({ length: 5 }, (v, i) => i).map((value, index) => (
        <GenericCardSkeleton key={index} className='mt-6' />
      ))}
    </div>
  );
};

export default FeedBlockSkeleton;
