import { Fragment, useEffect, useState } from 'react';
import SearchButton from '@/components/search-button';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
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
import { useMediaQuery } from '@/hooks/use-media-query';

const SearchDialogAndDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 640px)');

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prevState) => !prevState);
      }
    };
    document.addEventListener('keydown', down);

    //Cleaner
    return () => document.removeEventListener('keydown', down);
  }, []);

  return isDesktop ? (
    <Fragment>
      <SearchButton id='search-btn-desk' onClick={() => setOpen(() => true)} />
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className='sr-only'>Search</DialogTitle>
        <DialogDescription className='sr-only'>Search for anything...</DialogDescription>
        <CommandInput placeholder='Type to search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Suggestions'>
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
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
          <DrawerDescription className='sr-only'>Search for anything...</DrawerDescription>
        </DrawerHeader>
        <Input placeholder='Type to search...' />
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
