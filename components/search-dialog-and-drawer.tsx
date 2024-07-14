import { Fragment, useEffect, useState } from 'react';
import { Search2 } from '@/assets/icons';
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
import { useMediaQuery } from '@/hooks/use-media-query';

const SearchDialogAndDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

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
      <Button
        type='button'
        onClick={() => setOpen(() => true)}
        className='relative inline-flex h-8 w-full items-center justify-between whitespace-nowrap rounded-[0.5rem] border border-input bg-muted/50 p-2 text-sm font-normal text-muted-foreground shadow-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 md:w-40 lg:w-64'>
        <div className='inline-flex items-center space-x-1'>
          <Search2 className='size-4' />
          <span>Search</span>
        </div>
        <kbd className='pointer-events-none select-none items-center rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100'>
          CTRL/⌘ K
        </kbd>
      </Button>
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
        <Button
          type='button'
          className='relative inline-flex h-8 w-full items-center justify-between whitespace-nowrap rounded-[0.5rem] border border-input bg-muted/50 p-2 text-sm font-normal text-muted-foreground shadow-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 md:w-40 lg:w-64'>
          <div className='inline-flex items-center space-x-1'>
            <Search2 className='size-4' />
            <span>Search</span>
          </div>
          <kbd className='pointer-events-none select-none items-center rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100'>
            CTRL/⌘ K
          </kbd>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>Make changes to your profile here. Click save when you are done.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchDialogAndDrawer;
