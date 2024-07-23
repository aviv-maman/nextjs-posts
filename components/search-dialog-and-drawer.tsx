'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useCallback, useEffect, useState } from 'react';
import SearchButton from '@/components/search-button';
import { Button, buttonVariants } from '@/components/ui/button';
import { CommandDialog, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import { useMediaQuery } from '@/hooks/use-media-query';
import { fetchGenericItems } from '@/lib/items-data';

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
  const [suggestionResults, setSuggestionResults] = useState<Awaited<ReturnType<typeof fetchGenericItems>>['data']>([]);

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

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      fetchGenericItems({}).then((res) => {
        setSuggestionResults(() => res.data);
      });
    }
    return () => {
      ignore = true;
    };
  }, []);

  return isDesktop ? (
    <Fragment>
      <SearchButton id='search-btn-desk' onClick={() => setOpen(() => true)} />
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className='sr-only'>Search</DialogTitle>
        <DialogDescription className='sr-only'>{placeholder}</DialogDescription>
        <CommandInput placeholder={placeholder} onValueChange={setQuery} value={query} />
        <Button asChild variant='secondary' className='rounded-none' type='button'>
          <Link href={`/search?query=${debounced}`} onClick={() => setOpen(false)}>
            Search
          </Link>
        </Button>
        <CommandList>
          <CommandGroup heading='Last 6 Items'>
            {suggestionResults?.map((item, index) => {
              return (
                <CommandItem key={`${index}-${item.id}`} asChild className='cursor-pointer'>
                  <Link onClick={() => setOpen(false)} href={`/item/${item.id}`}>
                    {item.title}
                  </Link>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </Fragment>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <SearchButton id='search-btn-mob' isIconOnly />
      </DrawerTrigger>
      <DrawerContent className='h-3/4 p-3'>
        <DrawerHeader>
          <DrawerTitle className='sr-only'>Search</DrawerTitle>
          <DrawerDescription className='sr-only'>{placeholder}</DrawerDescription>
        </DrawerHeader>
        <Input placeholder={placeholder} onChange={(e) => setQuery(() => e.target.value)} value={query} />
        <Button asChild variant='secondary' className='my-4 w-32 self-center' type='button'>
          <Link href={`/search?query=${debounced}`} onClick={() => setOpen(false)}>
            Search
          </Link>
        </Button>
        <div className='flex flex-col gap-y-4'>
          <span className='text-center text-sm text-foreground'>Last 6 Items</span>
          {suggestionResults
            ?.filter((v) => v.title.toLowerCase().includes(query!))
            .map((item, index) => {
              return (
                <Link
                  key={`m-${index}-${item.id}`}
                  onClick={() => setOpen(false)}
                  href={`/item/${item.id}`}
                  className={buttonVariants({ variant: 'secondary' })}>
                  {item.title}
                </Link>
              );
            })}
        </div>
        <DrawerFooter className='items-center p-0 pt-3'>
          <DrawerClose asChild className='p-2'>
            <Button variant='outline' className='w-fit'>
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchDialogAndDrawer;
