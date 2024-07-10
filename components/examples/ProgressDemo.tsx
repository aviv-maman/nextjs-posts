'use client';

import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

export function ProgressDemo() {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className='w-full sm:w-[384px]'>
      <Progress value={progress} className='w-full' />
    </section>
  );
}
