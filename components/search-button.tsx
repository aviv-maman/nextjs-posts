import { forwardRef } from 'react';
import { Search2 } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SearchButton = forwardRef<HTMLButtonElement, SearchButtonProps>(({ className, ...props }, ref) => {
  return (
    <Button
      suppressHydrationWarning
      type='button'
      className={cn(
        'relative inline-flex h-8 w-full items-center justify-between whitespace-nowrap rounded-[0.5rem] border border-input bg-muted/50 p-2 text-sm font-normal text-muted-foreground shadow-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 md:w-64',
        className,
      )}
      ref={ref}
      {...props}>
      <div className='inline-flex items-center space-x-1'>
        <Search2 className='size-4' />
        <span>Search</span>
      </div>
      <kbd className='pointer-events-none select-none items-center rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100'>
        CTRL/⌘ K
      </kbd>
    </Button>
  );
});
SearchButton.displayName = 'SearchButton';

export default SearchButton;
