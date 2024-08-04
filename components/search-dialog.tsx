'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import SearchButton from '@/components/search-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import { useMediaQuery } from '@/hooks/use-media-query';

const SearchDialog: React.FC<{ placeholder?: string }> = ({ placeholder = 'Search for anything...' }) => {
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SearchButton id='search-btn-desk' onClick={() => setOpen(() => true)} isIconOnly={!isDesktop} />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogTitle>Search</DialogTitle>
        <DialogDescription className='sr-only'>{placeholder}</DialogDescription>
        <Input placeholder={placeholder} onChange={(e) => setQuery(() => e.target.value)} value={query} />
        <DialogFooter className='justify-end'>
          <Button asChild variant='default' type='button'>
            <Link href={debounced ? `/search?query=${debounced}` : '/search'} onClick={() => setOpen(false)}>
              Search
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
