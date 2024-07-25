import type { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { User } from '@/assets/icons';
import ItemCarousel from '@/components/item-carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { fetchGenericItemById } from '@/lib/items-data';

export const revalidate = 60;

type MetadataProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: MetadataProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data: item } = await fetchGenericItemById(params.id);

  return {
    title: `${item?.title}`,
  };
}

export default async function ItemPage({ params }: { params: { id: string } }) {
  const { data: item } = await fetchGenericItemById(params.id);

  if (!item) {
    notFound();
  }

  return (
    <section className='container relative flex min-h-[calc(100vh-146px)] flex-col items-center justify-between gap-y-6 p-6 sm:min-h-[calc(100vh-138px)] sm:px-8'>
      <Suspense fallback={<div>Loading Item...</div>}>
        <Card id='card_root-item' className='w-full border-none sm:max-w-5xl'>
          <CardHeader className='flex gap-y-2'>
            <h1 className='text-xl font-bold sm:text-3xl'>{item.title}</h1>
            <div className='flex space-x-2 text-base'>
              <Avatar>
                <AvatarImage src={item.image_url} />
                <AvatarFallback>
                  <User className='size-5' />
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <span>{item.name || 'Guest'}</span>
                <span className='text-xs'>{new Date(item.created_at).toLocaleString() || 'Not Available'}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className='space-y-6'>
            <AspectRatio ratio={16 / 9} className='rounded-md'>
              <Image src={item?.images?.[0] || '/1.jpg'} alt='Photo 1' fill className='rounded-md object-cover' />
            </AspectRatio>
            <ItemCarousel images={item?.images} />
            <p>{item.content}</p>
            <div className='flex flex-wrap gap-2'>
              {item.tags?.map((tag, index) => (
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
                Updated at {new Date(item.updated_at).toLocaleString()}
              </CardDescription>
            </div>
          </CardFooter>
        </Card>
      </Suspense>
    </section>
  );
}
