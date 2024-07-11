'use client';

import Link from 'next/link';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Logo, Menu } from '@/assets/icons';

interface HamburgerMenuProps {
  components?: { title: string; href?: string; action?: () => void; description: string }[];
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ components }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='size-5 hover:cursor-pointer hover:text-indigo-300' />
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader className='items-start'>
          <SheetTitle className='flex items-center gap-x-2' asChild>
            <Link href='/'>
              <Logo className='size-5' />
              <span className='font-bold'>FeedZ</span>
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
                  href={component.href}
                  className='mt-2 w-fit text-left text-sm text-muted-foreground'>
                  {component.title}
                </Link>
              ) : (
                <span
                  key={component.title}
                  onClick={component.action}
                  className='mt-2 w-fit cursor-pointer text-left text-sm text-muted-foreground'>
                  {component.title}
                </span>
              ),
            )}
          </div>
          <div className='mt-2 flex flex-col border-t-2 pl-6'>
            <Link href='/about' className='mt-2 w-fit text-left text-sm text-muted-foreground'>
              About
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
