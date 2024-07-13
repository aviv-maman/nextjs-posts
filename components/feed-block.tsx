'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import GenericCard from '@/components/generic-card';
import type { GenericItem } from '@/components/generic-card';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const FeedBlock: React.FC<{ data: GenericItem[] }> = ({ data }) => {
  const observerTarget = useRef<HTMLDivElement | null>(null);
  const observer = useIntersectionObserver(observerTarget, {});
  const [items, setItems] = useState(data);

  useEffect(() => {
    let ignore = false;
    if (!observer?.isIntersecting || !observerTarget.current) return;
    fetch(`${process.env.BASE_URL}/api/external/feed`).then((response) => {
      response.json().then((response) => {
        const { data } = response as { total: number; data: GenericItem[]; message: string };
        if (!ignore) {
          setItems((prevState) => [...prevState, ...data]);
        }
      });
    });
    return () => {
      ignore = true;
    };
  }, [observer?.isIntersecting]);

  return (
    <Fragment>
      {items.map((item) => (
        <GenericCard key={item.id} value={item} className='mt-6' />
      ))}
      <div id='feed-observer' ref={observerTarget} className='w-full' />
    </Fragment>
  );
};

export default FeedBlock;
