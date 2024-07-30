'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import FeedWrapperSkeleton from '@/components/feed-wrapper-skeleton';
import GenericCard from '@/components/generic-card';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { fetchGenericItems } from '@/lib/items-data';

const FeedBlock: React.FC<{ data: Awaited<ReturnType<typeof fetchGenericItems>>['data'] }> = ({ data }) => {
  const observerTarget = useRef<HTMLDivElement>(null);
  const observer = useIntersectionObserver(observerTarget, {});

  const [items, setItems] = useState(data || []);
  const [currentPage, setCurrentPage] = useState(2);
  const [isEnd, setIsEnd] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    let ignore = false;
    if (observer?.isIntersecting && observerTarget.current && !isEnd) {
      setIsFetching(() => true);
      fetchGenericItems({ currentPage, perPage: 6 }).then((response) => {
        if (!ignore && typeof response.data !== 'undefined') {
          setItems((prevState) => [...prevState, ...response.data]);
          setCurrentPage((prevState) => prevState + 1);
          response.data.length === 0 && setIsEnd(() => true);
          setIsFetching(() => false);
        }
      });
    }
    return () => {
      ignore = true;
    };
  }, [observer?.isIntersecting]);

  return (
    <Fragment>
      {items.map((item, index) => (
        <GenericCard key={`${item.id}-${index}`} value={item} className='mt-6' />
      ))}
      <div id='feed-observer' ref={observerTarget} className='w-full' />
      {isFetching && <FeedWrapperSkeleton />}
    </Fragment>
  );
};

export default FeedBlock;
