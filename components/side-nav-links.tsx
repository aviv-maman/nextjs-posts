'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LoaderCircle, LogOut, Settings, User } from '@/assets/icons';
import { useAuth } from '@/components/auth-provider';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

// Map of links to display in the side navigation.

const links = [
  {
    name: 'Profile',
    href: '/profile',
    icon: <User className='size-5' />,
  },
  {
    name: 'Settings',
    href: '/profile/settings',
    icon: <Settings className='size-5' />,
  },
];

export const SideNavLinks: React.FC = () => {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Tooltip key={link.name}>
            <TooltipTrigger asChild>
              <Link
                href={link.href}
                className={cn(
                  'flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground',
                  { 'bg-accent text-accent-foreground': pathname === link.href },
                )}>
                {link.icon}
                <span className='sr-only'>{link.name}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>{link.name}</TooltipContent>
          </Tooltip>
        );
      })}
    </>
  );
};

export const SideNavLogOut: React.FC = () => {
  const { isLoading, logout } = useAuth();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-inherit hover:text-foreground'
          disabled={isLoading}
          aria-disabled={isLoading}
          onClick={logout}>
          {isLoading ? <LoaderCircle className='size-5 animate-spin' /> : <LogOut className='size-5' />}
          <span className='sr-only'>Logout</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side='right'>Logout</TooltipContent>
    </Tooltip>
  );
};
