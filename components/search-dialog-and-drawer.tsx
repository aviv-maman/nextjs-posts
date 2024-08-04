'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import SearchButton from '@/components/search-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import { useMediaQuery } from '@/hooks/use-media-query';

const SearchDialogAndDrawer: React.FC<{ placeholder?: string }> = ({ placeholder = 'Search for anything...' }) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 640px)');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useCallback(
    (term?: string) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      if (term) {
        params.set('query', term);
      } else {
        params.delete('query');
      }
      const newPath = pathname.includes('/search')
        ? `${pathname}?${params.toString()}`
        : `/search?${params.toString()}`;
      replace(newPath);
    },
    [replace, pathname, searchParams],
  );

  const [query, setQuery] = useState(searchParams.get('query')?.toString());
  const debounced = useDebounce(query!, 1000);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prevState) => !prevState);
      }

      if (e.key === 'Enter' && open) {
        e.preventDefault();
        setOpen(() => false);
        handleSearch(debounced);
      }
    };
    document.addEventListener('keydown', down);

    //Cleaner
    return () => {
      document.removeEventListener('keydown', down);
    };
  }, [open, handleSearch, debounced]);

  return isDesktop ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SearchButton id='search-btn-desk' onClick={() => setOpen(() => true)} />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogTitle>Search</DialogTitle>
        <DialogDescription className='sr-only'>{placeholder}</DialogDescription>
        <Input placeholder={placeholder} onChange={(e) => setQuery(() => e.target.value)} value={query} />
        <DialogFooter className='justify-end'>
          <Button asChild variant='default' className='w-fit justify-self-center' type='button'>
            <Link href={debounced ? `/search?query=${debounced}` : '/search'} onClick={() => setOpen(false)}>
              Search
            </Link>
          </Button>
          <DialogClose asChild>
            <Button type='button' variant='outline'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <SearchButton id='search-btn-mob' isIconOnly />
      </DrawerTrigger>
      <DrawerContent className='h-5/6 p-3'>
        <DrawerHeader>
          <DrawerTitle className='sr-only'>Search</DrawerTitle>
          <DrawerDescription className='sr-only'>{placeholder}</DrawerDescription>
        </DrawerHeader>
        <Input placeholder={placeholder} onChange={(e) => setQuery(() => e.target.value)} value={query} />
        <div className='mt-4 flex justify-end gap-x-2'>
          <Button asChild variant='default' className='w-fit' type='button'>
            <Link href={debounced ? `/search?query=${debounced}` : '/search'} onClick={() => setOpen(false)}>
              Search
            </Link>
          </Button>
          <DrawerClose asChild className='p-2'>
            <Button variant='outline' className='w-fit'>
              Close
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchDialogAndDrawer;
