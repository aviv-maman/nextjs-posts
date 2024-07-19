import Link from 'next/link';
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
import { useIsClient } from '@/hooks/use-is-client';
import { useMediaQuery } from '@/hooks/use-media-query';

export function UserDropdownMenu() {
  const { isLoading, session } = useAuth();
  const isDesktop = useMediaQuery('(min-width: 640px)');
  const isClient = useIsClient();

  if (isLoading || !isClient) {
    return <Skeleton className='size-7 rounded-full' />;
  }

  return session ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link href='/profile' aria-label='profile' className='flex items-center'>
              <CircleUser className='mr-2 size-4' />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link href='/profile/settings' aria-label='settings' className='flex items-center'>
              <Settings className='mr-2 size-4' />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer'>
          <LogOut className='mr-2 size-4' />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : isDesktop ? (
    <Link
      aria-label='login'
      href='/login'
      className='h-8 content-center rounded-md border bg-transparent px-2 text-sm hover:bg-muted'>
      Log In
    </Link>
  ) : (
    <Link aria-label='login' href='/login' passHref legacyBehavior>
      <span className='flex size-8 items-center justify-center rounded-md border bg-transparent hover:bg-muted'>
        <LogIn className='size-4' />
      </span>
    </Link>
  );
}
