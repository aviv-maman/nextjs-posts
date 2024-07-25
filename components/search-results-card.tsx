'use client';

import Image from 'next/image';
import { User } from '@/assets/icons';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import type { fetchGenericItemById } from '@/lib/items-data';
import { cn } from '@/lib/utils';

interface SearchResultsCardProps extends React.ComponentProps<typeof Card> {
  value: Awaited<ReturnType<typeof fetchGenericItemById>>['data'];
}

const SearchResultsCard: React.FC<SearchResultsCardProps> = ({ value, ...props }) => {
  return (
    <Card className={cn('flex w-full flex-col gap-y-4 p-4', props.className)} {...props}>
      <CardHeader className='p-0'>
        <div className='flex items-center space-x-2 text-base'>
          <Avatar>
            <AvatarImage src={value?.image_url} />
            <AvatarFallback>
              <User className='size-5' />
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <span className='line-clamp-1'>{value?.name || 'Guest'}</span>
            <span className='text-xs'>{new Date(value?.created_at || 0).toLocaleString() || 'Not Available'}</span>
          </div>
        </div>
      </CardHeader>
      <AspectRatio ratio={16 / 9} className='rounded-md'>
        <Image src={value?.images?.[0] || '/1.jpg'} alt='Photo 1' fill className='rounded-md object-cover' />
      </AspectRatio>
      <CardTitle className='line-clamp-2 min-h-16 content-center text-lg'>{value?.title}</CardTitle>
      <div className='flex flex-wrap gap-2'>
        {value?.tags?.map((tag, index) => (
          <span
            key={index}
            className='inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground'>
            {tag}
          </span>
        ))}
      </div>
    </Card>
  );
};

export default SearchResultsCard;
