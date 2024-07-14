import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

export function UserAvatar() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(() => true);
  }, []);

  if (!isClient) {
    return <Skeleton className='size-7 rounded-full' />;
  }

  return (
    <Avatar id='avatar-header' className='size-7'>
      <AvatarImage src='https://github.com/shadcn.png' alt='@shad' />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
