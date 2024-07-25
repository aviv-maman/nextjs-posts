import Image from 'next/image';
import { User } from '@/assets/icons';
import ItemCarousel from '@/components/item-carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { fetchGenericItemById } from '@/lib/items-data';

const ItemCard: React.FC<{ id: string }> = async ({ id }) => {
  const { data: item } = await fetchGenericItemById(id);

  return (
    <Card id='card_root-item' className='w-full border-none sm:max-w-5xl'>
      <CardHeader className='flex gap-y-2 px-0'>
        <h1 className='text-xl font-bold sm:text-3xl'>{item?.title}</h1>
        <div className='flex space-x-2 text-base'>
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
      </CardHeader>
      <CardContent className='space-y-6 px-0'>
        <AspectRatio ratio={16 / 9} className='rounded-md'>
          <Image src={item?.images?.[0] || '/1.jpg'} alt='Photo 1' fill className='rounded-md object-cover' />
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
