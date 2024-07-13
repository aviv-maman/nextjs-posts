import GenericCardSkeleton from '@/components/generic-card-skeleton';

const FeedWrapperSkeleton: React.FC = () => {
  return (
    <div id='feed-block-skeleton' className='flex w-full max-w-96 flex-col sm:max-w-md'>
      {Array.from({ length: 5 }, (v, i) => i).map((value, index) => (
        <GenericCardSkeleton key={index} className='mt-6' />
      ))}
    </div>
  );
};

export default FeedWrapperSkeleton;
