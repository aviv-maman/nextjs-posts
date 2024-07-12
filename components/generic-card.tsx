'use client';

import { UserIcon } from 'lucide-react';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type GenericItem = {
  id: string;
  title: string;
  content: string;
  is_published: boolean;
  is_private: boolean;
  images: string[];
  tags: string[];
  website: string;
  created_at: string;
  updated_at: string;
  owner_id?: string | null;
  owner_email?: string | null;
  owner_name?: string | null;
  owner_picture?: string | null;
};
interface GenericCardProps extends React.ComponentProps<typeof Card> {
  value: GenericItem;
}

const GenericCard: React.FC<GenericCardProps> = ({ value, ...props }) => {
  return (
    <Card className={cn('w-full', props.className)} {...props}>
      <CardHeader className='p-0'>
        <AspectRatio ratio={16 / 9} className='rounded-t-md'>
          <Image src={value.images[0] || '/1.jpg'} alt='Photo 1' fill className='rounded-t-md object-cover' />
        </AspectRatio>
      </CardHeader>
      <div className='flex items-center space-x-2 border-t p-4 text-base'>
        <Avatar>
          <AvatarImage src={value.owner_picture || undefined} />
          <AvatarFallback>
            <UserIcon className='size-5' />
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <span>{value.owner_name || 'Guest'}</span>
          <span className='text-xs'>{new Date(value.created_at).toLocaleString() || 'Not Available'}</span>
        </div>
      </div>
      <div className='space-y-2 p-4 pt-0'>
        <CardTitle className='content-center text-xl'>{value.title}</CardTitle>
        <CardContent className='space-x-4 p-0 text-sm text-muted-foreground'>{value.content}</CardContent>
      </div>
      <CardFooter className='h-auto w-full border-t p-4'>
        <div className='flex h-full flex-col justify-between space-y-4'>
          <CardDescription className='text-xs'>
            Updated at {new Date(value.updated_at).toLocaleString()}
          </CardDescription>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GenericCard;
