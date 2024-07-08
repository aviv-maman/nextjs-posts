'use client';

import { HomeIcon, MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface HamburgerMenuProps {
  components?: { title: string; href: string; description: string }[];
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ components }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <MenuIcon className='size-5 hover:cursor-pointer hover:text-indigo-300' />
      </SheetTrigger>
      <SheetContent side='left'>
        <div className='relative h-[calc(100vh-8rem)] overflow-hidden pb-10'>
          <div className='flex gap-x-2'>
            <HomeIcon className='size-5' />
            <div className='font-bold'>ToDoz</div>
          </div>
          <div className='flex flex-col space-y-2 pl-6'>
            <span className='mt-2 w-fit text-left'>Menu</span>
            {components?.map((component) => (
              <Link
                key={component.title}
                href={component.href}
                className='mt-2 w-fit text-left text-sm text-muted-foreground'>
                {component.title}
              </Link>
            ))}
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
