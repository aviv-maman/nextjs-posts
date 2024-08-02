import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { Pencil, User } from '@/assets/icons';
import { PlaceholderBase64 } from '@/assets/images';
import DeleteItemDialog from '@/components/delete-item-dialog';
import ItemCarousel from '@/components/item-carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { authenticate } from '@/lib/auth/actions';
import { fetchGenericItemById } from '@/lib/items/data';
import { cn } from '@/lib/utils';

const ItemCard: React.FC<{ id: string }> = async ({ id }) => {
  const [{ data: item }, { session, user }] = await Promise.all([fetchGenericItemById(id), authenticate()]);
  const [isOwner, isAdmin] = [item?.owner_id === session?.userId, user?.role === 'admin'];

  return (
    <Card id='card_root-item' className='w-full border-none sm:max-w-5xl'>
      <CardHeader className='flex gap-y-2 px-0'>
        <h1 className='text-xl font-bold sm:text-3xl'>{item?.title}</h1>
        <div className='flex items-center justify-between text-base'>
          <div className='flex space-x-2'>
            <Avatar>
              <AvatarImage src={item?.owner_image} />
              <AvatarFallback>
                <User className='size-5' />
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <span>{item?.owner_name || 'Guest'}</span>
              <span className='text-xs'>{new Date(item?.created_at || 0).toLocaleString() || 'Not Available'}</span>
            </div>
          </div>
          {(isOwner || isAdmin) && (
            <div className='flex gap-x-2'>
              <DeleteItemDialog id={id} />
              <Link
                href={`/item/${id}/edit`}
                className={cn(buttonVariants({ variant: 'default', size: 'icon' }), 'size-8')}>
                <Pencil className='size-4' />
              </Link>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className='space-y-6 px-0'>
        <AspectRatio ratio={16 / 9} className='rounded-md'>
          <Image
            src={item?.images?.[item?.images.length - 1] || '/placeholder.svg'}
            alt='Main Photo'
            fill
            className='rounded-md object-cover'
            quality={100}
            placeholder={`data:image/svg+xml;base64,${PlaceholderBase64}`}
          />
        </AspectRatio>
        <ItemCarousel images={item?.images} />
        <p>{item?.content}</p>
        <div className='flex flex-wrap gap-2'>
          {item?.tags?.map((tag, index) => (
            <span
              key={index}
              className='inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground'>
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter id='item-footer' className='h-auto w-full px-0 py-4'>
        <div className='flex h-full flex-col justify-between space-y-4'>
          <CardDescription className='text-xs'>
            Updated at {new Date(item?.updated_at || 0).toLocaleString()}
          </CardDescription>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
