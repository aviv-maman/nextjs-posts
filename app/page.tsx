'use server';

import Image from 'next/image';
import { Suspense } from 'react';
import Feature from '@/components/feature';
import PostGrid from '@/components/post-grid';
import { features } from '@/lib/features';

export default async function HomePage() {
  return (
    <section className='container relative flex min-h-[calc(100vh-146px)] flex-col items-center justify-center gap-6 p-2 sm:min-h-[calc(100vh-138px)] sm:px-8'>
      <div className='flex w-full flex-col justify-between gap-x-6 sm:flex-row'>
        <div className='flex w-full flex-col gap-y-6 place-self-center lg:col-span-7'>
          <div className='gap-x-4 lg:col-span-5 lg:flex'>
            <div>
              <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl'>
                Next.js Posts
              </h1>
              <p className='mb-4 font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl'>
                Explore features like pagination, infinite scrolling, and search.
              </p>
            </div>
            <div className='flex justify-center'>
              <Image src='/text-editor-dark.svg' alt='main' width={384} height={384} />
            </div>
          </div>
          <h1 className='text-center text-xl font-extrabold leading-none tracking-tight md:text-2xl xl:text-3xl'>
            Features
          </h1>
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
            {features.map((feature, index) => (
              <Feature key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
      <h1 className='max-w-2xl text-xl font-extrabold leading-none tracking-tight md:text-2xl xl:text-3xl'>
        Latest Posts
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <PostGrid />
      </Suspense>
    </section>
  );
}
