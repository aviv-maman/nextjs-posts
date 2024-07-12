'use server';

import { Suspense } from 'react';
import { SkeletonDemo } from '@/components/examples/SkeletonDemo';
import { Feed } from '@/components/feed';

export default async function FeedPage() {
  return (
    <section className='container relative flex min-h-[calc(100vh-150px)] flex-col p-6 sm:min-h-[calc(100vh-142px)] sm:px-8'>
      <Suspense fallback={<SkeletonDemo />}>
        <Feed />
      </Suspense>
    </section>
  );
}
