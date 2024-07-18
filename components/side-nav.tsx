import Link from 'next/link';
import { Logo } from '@/assets/icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// import NavLinks from '@/components/dashboard/nav-links';

export default function SideNav() {
  //'fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'
  return (
    <aside className='inset-y fixed left-0 hidden h-full w-14 flex-col border-r bg-background sm:flex'>
      <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
        <Link
          href='#'
          className='group flex size-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:size-8 md:text-base'>
          <Logo className='size-4 transition-all group-hover:scale-110' />
          <span className='sr-only'>Acme Inc</span>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href='#'
              className='flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8'>
              <Logo className='size-5' />
              <span className='sr-only'>Dashboard</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right'>Dashboard</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href='#'
              className='flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:size-8'>
              <Logo className='size-5' />
              <span className='sr-only'>Orders</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right'>Orders</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href='#'
              className='flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8'>
              <Logo className='size-5' />
              <span className='sr-only'>Products</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right'>Products</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href='#'
              className='flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8'>
              <Logo className='size-5' />
              <span className='sr-only'>Customers</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right'>Customers</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href='#'
              className='flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8'>
              <Logo className='size-5' />
              <span className='sr-only'>Analytics</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right'>Analytics</TooltipContent>
        </Tooltip>
      </nav>
      <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href='#'
              className='flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8'>
              <Logo className='size-5' />
              <span className='sr-only'>Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right'>Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}
