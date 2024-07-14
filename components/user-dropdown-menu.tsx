import { Fragment } from 'react';
import { CircleUser, LogIn, LogOut, Settings } from '@/assets/icons';
import { useAuth } from '@/components/auth-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar } from '@/components/user-avatar';

export function UserDropdownMenu() {
  const { isLoading, session } = useAuth();

  if (isLoading) {
    return <Skeleton className='size-7 rounded-full' />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        {session ? (
          <Fragment>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className='cursor-pointer'>
                <CircleUser className='mr-2 size-4' />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer'>
                <Settings className='mr-2 size-4' />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer'>
              <LogOut className='mr-2 size-4' />
              <span>Log Out</span>
            </DropdownMenuItem>
          </Fragment>
        ) : (
          <DropdownMenuItem className='cursor-pointer'>
            <LogIn className='mr-2 size-4' />
            <span>Log In</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
