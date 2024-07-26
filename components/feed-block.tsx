'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import GenericCard from '@/components/generic-card';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useIsClient } from '@/hooks/use-is-client';
import { fetchGenericItems } from '@/lib/items-data';

const FeedBlock: React.FC<{ data: Awaited<ReturnType<typeof fetchGenericItems>>['data'] }> = ({ data }) => {
  const observerTarget = useRef<HTMLDivElement>(null);
  const observer = useIntersectionObserver(observerTarget, {});
  const isClient = useIsClient();

  const [items, setItems] = useState(data || []);
  const [currentPage, setCurrentPage] = useState(2);

  useEffect(() => {
    let ignore = false;
    if (!observer?.isIntersecting || !observerTarget.current || !isClient) return;
    fetchGenericItems({ currentPage }).then((response) => {
      if (!ignore && typeof response.data !== 'undefined') {
        setItems((prevState) => [...prevState, ...response.data]);
        setCurrentPage((prevState) => prevState + 1);
      }
    });
    return () => {
      ignore = true;
    };
  }, [observer?.isIntersecting, isClient]);

  return (
    <Fragment>
      {items.map((item, index) => (
        <GenericCard key={`${item.id}-${index}`} value={item} className='mt-6' />
      ))}
      <div id='feed-observer' ref={observerTarget} className='w-full' />
    </Fragment>
  );
};

export default FeedBlock;
