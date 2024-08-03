'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PlaceholderBase64 } from '@/assets/images';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { fetchGenericItemById } from '@/lib/items/data';
import { cn } from '@/lib/utils';

interface PostCardProps extends React.ComponentProps<typeof Card> {
  value: Awaited<ReturnType<typeof fetchGenericItemById>>['data'];
  withImage?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ value, withImage, ...props }) => {
  return (
    <Link href={`/item/${value?.id}`} passHref>
      <Card className={cn('w-full', props.className)} {...props}>
        {withImage && (
          <CardHeader className='p-0'>
            <AspectRatio ratio={16 / 9} className='rounded-t-md'>
              <Image
                src={value?.images?.[value?.images.length - 1] || '/placeholder.svg'}
                alt='Main Photo'
                fill
                className='rounded-t-md object-cover'
                quality={100}
                placeholder={`data:image/svg+xml;base64,${PlaceholderBase64}`}
              />
            </AspectRatio>
          </CardHeader>
        )}
        <div className={cn('flex items-center space-x-2 p-3 text-base', { 'border-t': withImage })}>
          {value?.tags?.map((tag, index) => (
            <span
              key={index}
              className='inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground'>
              {tag}
            </span>
          ))}
        </div>
        <div className='space-y-2 px-3'>
          <CardTitle className='content-center text-xl'>{value?.title}</CardTitle>
        </div>
        <CardDescription className='p-3'>Read More ➡️</CardDescription>
      </Card>
    </Link>
  );
};

export default PostCard;
