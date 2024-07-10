import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export function AspectRatioDemo() {
  return (
    <section className='w-full sm:w-[384px]'>
      <AspectRatio ratio={16 / 9} className='rounded-md bg-muted'>
        <Image
          src='https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'
          alt='Photo by Drew Beamer'
          fill
          className='rounded-md object-cover'
        />
      </AspectRatio>
    </section>
  );
}
