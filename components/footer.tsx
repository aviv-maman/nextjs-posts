'use client';

import Link from 'next/link';
import { GitHub2, LinkedIn } from '@/assets/icons';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const establishedYear = 2024;
  const currentYear = new Date().getFullYear();
  const range = currentYear > establishedYear ? `${establishedYear}-${currentYear}` : `${establishedYear}`;

  return (
    <footer className='mx-auto border-t border-neutral-200 bg-neutral-100 px-6 dark:border-neutral-800 dark:bg-zinc-950'>
      <div className='container flex flex-col items-center justify-between py-3 sm:flex-row sm:py-6'>
        <div className='pb-3 text-sm lg:pb-0'>
          <span>&copy; {range} FeedZ. All rights reserved.</span>
        </div>
        <div className='flex items-center gap-1'>
          <Link href='https://github.com/aviv-maman/todo-auth0' target='_blank' referrerPolicy='no-referrer'>
            <Button
              aria-label='GitHub'
              variant='ghost'
              size='icon'
              className='size-9 hover:bg-neutral-300 dark:hover:bg-neutral-800'>
              <GitHub2 className='size-5' />
            </Button>
          </Link>
          <Link href='https://www.linkedin.com/in/aviv-maman-914a95223' target='_blank' referrerPolicy='no-referrer'>
            <Button
              aria-label='LinkedIn'
              variant='ghost'
              size='icon'
              className='size-9 hover:bg-neutral-300 dark:hover:bg-neutral-800'>
              <LinkedIn className='size-5 text-blue-600' />
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
}
