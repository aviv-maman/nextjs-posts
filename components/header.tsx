'use client';

import Link from 'next/link';
import { forwardRef } from 'react';
import { HamburgerMenu } from './hamburger-menu';
import { GitHub, LinkedIn, Logo } from '@/assets/icons';
import { useAuth } from '@/components/auth-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

export const Header: React.FC = () => {
  const { user, isLoading, logout } = useAuth();

  const guestComponents: { title: string; href?: string; action?: () => void; description: string }[] = [
    {
      title: 'Sign In',
      href: '/login',
      description: 'Login to an existing account or register a new account.',
    },
  ];
  const userComponents: { title: string; href?: string; action?: () => void; description: string }[] = [
    {
      title: 'Profile',
      href: '/profile',
      description: 'Your user profile.',
    },
    {
      title: 'Logout',
      action: logout,
      description: 'Logout the current session.',
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 max-w-screen-2xl items-center px-4 md:px-8'>
        <div className='mr-4 hidden md:flex'>
          <div className='mr-6 flex items-center space-x-2'>
            <Link href='/' className='mr-6 flex items-center space-x-2' passHref>
              <Logo className='size-5' />
              <span>FeedZ</span>
            </Link>
          </div>
          <NavigationMenu>
            <NavigationMenuList className='hidden sm:flex'>
              <NavigationMenuItem>
                <NavigationMenuTrigger className='bg-transparent'>Menu</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                    <li className='row-span-3'>
                      <NavigationMenuLink asChild>
                        <div className='flex size-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'>
                          <span className='mb-2 mt-4 text-lg font-medium'>FeedZ</span>
                          <p className='text-sm leading-tight text-muted-foreground'>Feeds and much more 🥲</p>
                        </div>
                      </NavigationMenuLink>
                    </li>
                    {user
                      ? userComponents.map((component) =>
                          component.href ? (
                            <ListItemA key={component.title} title={component.title} href={component.href}>
                              {component.description}
                            </ListItemA>
                          ) : (
                            <ListItemSpan key={component.title} title={component.title} onClick={component.action}>
                              {component.description}
                            </ListItemSpan>
                          ),
                        )
                      : guestComponents.map((component) =>
                          component.href ? (
                            <ListItemA key={component.title} title={component.title} href={component.href}>
                              {component.description}
                            </ListItemA>
                          ) : (
                            <ListItemSpan key={component.title} title={component.title} onClick={component.action}>
                              {component.description}
                            </ListItemSpan>
                          ),
                        )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href='/feed' legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Feed</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* MOBILE */}
        <div className='mr-2 inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md px-0 py-2 text-base font-medium transition-colors hover:bg-transparent hover:text-accent-foreground focus-visible:bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 md:hidden'>
          <HamburgerMenu components={user ? userComponents : guestComponents} />
          <span className='sr-only'>Toggle Menu</span>
        </div>

        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <nav className='flex items-center'>
            <Link href='https://github.com/aviv-maman' target='_blank' referrerPolicy='no-referrer'>
              <Button aria-label='github' variant='ghost' size='icon' className='size-8 bg-transparent'>
                <GitHub className='size-4' />
              </Button>
            </Link>
            <Link href='https://www.linkedin.com/in/aviv-maman-914a95223' target='_blank' referrerPolicy='no-referrer'>
              <Button aria-label='linkedin' variant='ghost' size='icon' className='size-8 bg-transparent'>
                <LinkedIn className='size-4 text-blue-500' />
              </Button>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

const ListItemA = forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}>
            <div className='text-sm font-medium leading-none'>{title}</div>
            <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItemA.displayName = 'ListItemA';

const ListItemSpan = forwardRef<React.ElementRef<'span'>, React.ComponentPropsWithoutRef<'span'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <span
            ref={ref}
            className={cn(
              'cursor-pointer block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}>
            <div className='text-sm font-medium leading-none'>{title}</div>
            <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
          </span>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItemSpan.displayName = 'ListItemSpan';
