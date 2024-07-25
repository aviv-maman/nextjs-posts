'use server';

import { Suspense } from 'react';

export default async function HomePage() {
  return (
    <section className='container relative flex min-h-[calc(100vh-146px)] flex-col items-center justify-between gap-y-6 p-6 sm:min-h-[calc(100vh-138px)] sm:px-8'>
      Home Page
    </section>
  );
}
