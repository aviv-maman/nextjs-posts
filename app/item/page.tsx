'use server';

import Image from 'next/image';
import { Suspense } from 'react';
import { User } from '@/assets/icons';
import ItemCarousel from '@/components/item-carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import mockData from '@/mock_data.json';

export default async function ItemPage({ params }: { params: { id: string } }) {
  const mockItem = mockData[1];

  return (
    <section className='container relative flex min-h-[calc(100vh-146px)] flex-col items-center justify-between gap-y-6 p-6 sm:min-h-[calc(100vh-138px)] sm:px-8'>
      <Suspense fallback={<div>Loading Item...</div>}>
        <Card id='card_root-item' className='w-full border-none sm:max-w-5xl'>
          <CardHeader className='flex gap-y-2'>
            <h1 className='text-xl font-bold sm:text-3xl'>{mockItem.title}</h1>
            <div className='flex space-x-2 text-base'>
              <Avatar>
                <AvatarImage src={undefined} />
                <AvatarFallback>
                  <User className='size-5' />
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <span>{'Guest'}</span>
                <span className='text-xs'>{new Date(mockItem.created_at).toLocaleString() || 'Not Available'}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className='space-y-6'>
            <AspectRatio ratio={16 / 9} className='rounded-md'>
              <Image src={mockItem.images[0] || '/1.jpg'} alt='Photo 1' fill className='rounded-md object-cover' />
            </AspectRatio>
            <ItemCarousel images={mockItem?.images} />
            <p>{mockItem.content}</p>
            <div className='flex flex-wrap gap-2'>
              {mockItem.tags?.map((tag, index) => (
                <span
                  key={index}
                  className='inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground'>
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
          <CardFooter id='item-footer' className='h-auto w-full p-4'>
            <div className='flex h-full flex-col justify-between space-y-4'>
              <CardDescription className='text-xs'>
                Updated at {new Date(mockItem.updated_at).toLocaleString()}
              </CardDescription>
            </div>
          </CardFooter>
        </Card>
      </Suspense>
    </section>
  );
}
