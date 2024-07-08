import Image from 'next/image';
import { Fragment } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

interface Artwork {
  artist: string;
  art: string;
}

export const works: Artwork[] = [
  {
    artist: 'Orel Bin',
    art: 'https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80',
  },
  {
    artist: 'Tom Bom',
    art: 'https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80',
  },
  {
    artist: 'Vladimir Molly',
    art: 'https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80',
  },
];

export function ScrollAreaDemo() {
  return (
    <section className='flex flex-col gap-y-4'>
      <ScrollArea className='h-72 w-48 rounded-md border'>
        <div className='p-4'>
          <h4 className='mb-4 text-sm font-medium leading-none'>Tags</h4>
          {tags.map((tag) => (
            <Fragment key={tag}>
              <div key={tag} className='text-sm'>
                {tag}
              </div>
              <Separator className='my-2' />
            </Fragment>
          ))}
        </div>
      </ScrollArea>

      <ScrollArea className='w-96 whitespace-nowrap rounded-md border'>
        <div className='flex w-max space-x-4 p-4'>
          {works.map((artwork) => (
            <figure key={artwork.artist} className='shrink-0'>
              <div className='overflow-hidden rounded-md'>
                <Image
                  src={artwork.art}
                  alt={`Photo by ${artwork.artist}`}
                  className='aspect-[3/4] size-fit object-cover'
                  width={300}
                  height={400}
                />
              </div>
              <figcaption className='pt-2 text-xs text-muted-foreground'>
                Photo by <span className='font-semibold text-foreground'>{artwork.artist}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </section>
  );
}
