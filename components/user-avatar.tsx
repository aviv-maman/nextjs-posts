import { forwardRef } from 'react';
import { User } from '@/assets/icons';
import { useAuth } from '@/components/auth-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface UserAvatarProps extends React.ComponentPropsWithoutRef<typeof Avatar> {}

export const UserAvatar = forwardRef<React.ElementRef<typeof Avatar>, UserAvatarProps>(
  ({ className, ...props }, ref) => {
    const { isLoading, user } = useAuth();

    if (isLoading) {
      return <Skeleton className='size-7 rounded-full' />;
    }

    return (
      <Avatar id='avatar-header' className={cn('size-7 cursor-pointer', className)} ref={ref} {...props}>
        <AvatarImage src={user?.imageUrl ?? undefined} alt={user?.name ?? 'Avatar'} />
        <AvatarFallback>
          <User className='size-5' />
        </AvatarFallback>
      </Avatar>
    );
  },
);

UserAvatar.displayName = 'UserAvatar';
