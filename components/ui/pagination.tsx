import Link from 'next/link';
import { forwardRef } from 'react';
import { ChevronLeft, ChevronRight, Ellipsis } from '@/assets/icons';
import { type ButtonProps, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role='navigation'
    aria-label='pagination'
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn('flex size-8 cursor-default items-center justify-center rounded-md text-center text-sm', className)}
    {...props}
  />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<typeof Link>;

const PaginationLink = ({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) => (
  <Link
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size,
      }),
      'size-8 p-0',
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
  className,
  isDisabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { isDisabled?: boolean }) =>
  isDisabled ? (
    <ChevronLeft className='size-4' />
  ) : (
    <PaginationLink aria-label='Go to previous page' size='default' className={className} {...props}>
      <ChevronLeft className='size-4' />
    </PaginationLink>
  );
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
  className,
  isDisabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { isDisabled?: boolean }) =>
  isDisabled ? (
    <ChevronRight className='size-4' />
  ) : (
    <PaginationLink aria-label='Go to next page' size='default' className={className} {...props}>
      <ChevronRight className='size-4' />
    </PaginationLink>
  );
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span aria-hidden className={cn('flex size-8 items-center justify-center', className)} {...props}>
    <Ellipsis className='size-4' />
    <span className='sr-only'>More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
