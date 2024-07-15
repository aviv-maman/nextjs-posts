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
    <PaginationItem className='size-10 cursor-default content-center rounded-md bg-primary/90 text-center text-sm'>
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
            <span className='cursor-default'>Previous</span>
          </>
        ) : (
          <PaginationPrevious href={href} />
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
            <span className='cursor-default'>Next</span>
            <ChevronRight className='size-4' />
          </>
        ) : (
          <PaginationNext href={href} />
        )}
      </PaginationItem>
    );

  return item;
}
