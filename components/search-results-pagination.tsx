'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from '@/assets/icons';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn, generatePagination } from '@/lib/utils';

export default function SearchResultsPagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationArrow direction='left' href={createPageURL(currentPage - 1)} isDisabled={currentPage <= 1} />

        {allPages.map((page, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined;

          if (index === 0) position = 'first';
          if (index === allPages.length - 1) position = 'last';
          if (allPages.length === 1) position = 'single';
          if (page === '...') position = 'middle';

          return (
            <PaginationNumber
              key={page}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}

        <PaginationArrow
          direction='right'
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </PaginationContent>
    </Pagination>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  return isActive ? (
    <PaginationItem className='size-10 cursor-default content-center rounded-md bg-slate-500/50 text-center text-sm dark:bg-slate-800/50'>
      <span>{page}</span>
    </PaginationItem>
  ) : position === 'middle' ? (
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
  ) : (
    <PaginationItem>
      <PaginationLink href={href} isActive={isActive}>
        {page}
      </PaginationLink>
    </PaginationItem>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const isDesktop = useMediaQuery('(min-width: 640px)');

  const item =
    direction === 'left' ? (
      <PaginationItem
        className={cn({
          'flex h-10 items-center justify-center gap-1 rounded-md bg-gray-200 py-2 pl-2.5 pr-4 text-sm font-medium dark:bg-gray-900':
            isDisabled,
        })}>
        {isDisabled ? (
          <>
            <ChevronLeft className='size-4' />
            {isDesktop && <span className='cursor-default'>Previous</span>}
          </>
        ) : (
          <>
            {isDesktop ? (
              <PaginationPrevious href={href} />
            ) : (
              <PaginationLink
                aria-label='Go to previous page'
                size='default'
                className={cn('gap-1 pl-2.5')}
                href={href}>
                <ChevronLeft className='size-4' />
              </PaginationLink>
            )}
          </>
        )}
      </PaginationItem>
    ) : (
      <PaginationItem
        className={cn({
          'flex h-10 items-center justify-center gap-1 rounded-md bg-gray-200 py-2 pl-4 pr-2.5 text-sm font-medium dark:bg-gray-900':
            isDisabled,
        })}>
        {isDisabled ? (
          <>
            {isDesktop && <span className='cursor-default'>Next</span>}
            <ChevronRight className='size-4' />
          </>
        ) : (
          <>
            {isDesktop ? (
              <PaginationNext href={href} />
            ) : (
              <PaginationLink aria-label='Go to next page' size='default' className={cn('gap-1 pr-2.5')} href={href}>
                <ChevronRight className='size-4' />
              </PaginationLink>
            )}
          </>
        )}
      </PaginationItem>
    );

  return item;
}
