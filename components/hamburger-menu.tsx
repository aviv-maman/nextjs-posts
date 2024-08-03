'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { Logo, Menu } from '@/assets/icons';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface HamburgerMenuProps {
  components?: { title: string; href?: Route<string> | string; action?: () => void; description: string }[];
  navItems?: { title: string; href: Route<string> | string }[];
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ components, navItems }) => {
  return (
    <Sheet>
      <SheetTrigger className='flex size-8 items-center justify-center rounded-md hover:cursor-pointer hover:bg-accent hover:text-accent-foreground'>
        <Menu className='size-4' />
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader className='items-start'>
          <SheetTitle asChild>
            <Link href='/'>
              <SheetClose className='flex items-center gap-x-2'>
                <Logo className='size-5' />
                <span className='font-bold'>FeedZ</span>
              </SheetClose>
            </Link>
          </SheetTitle>
          <SheetDescription className='sr-only'>Choose a page you would like to navigate to.</SheetDescription>
        </SheetHeader>
        <div className='relative h-[calc(100vh-8rem)] overflow-hidden pb-10'>
          <div className='flex flex-col space-y-2 pl-6'>
            <span className='mt-2 w-fit text-left'>Menu</span>
            {components?.map((component) =>
              component.href ? (
                <Link
                  key={component.title}
                  href={component.href as Route}
                  className='mt-2 w-fit text-left text-sm text-muted-foreground'>
                  <SheetClose>{component.title}</SheetClose>
                </Link>
              ) : (
                <span
                  key={component.title}
                  onClick={component.action}
                  className='mt-2 w-fit cursor-pointer text-left text-sm text-muted-foreground'>
                  <SheetClose>{component.title}</SheetClose>
                </span>
              ),
            )}
          </div>
          <div className='mt-2 flex flex-col border-t-2 pl-6'>
            {navItems?.map((item) => (
              <Link key={item.title} href={item.href} className='mt-2 w-fit text-left text-sm text-muted-foreground'>
                <SheetClose>{item.title}</SheetClose>
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
