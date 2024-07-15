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
    <PaginationItem className='bg-slate-300/50 dark:bg-slate-800/50'>
      <span>{page}</span>
    </PaginationItem>
  ) : position === 'middle' ? (
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
  ) : (
    <PaginationItem>
      <PaginationLink href={href}>{page}</PaginationLink>
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
          'bg-slate-300/50 dark:bg-slate-800/50': isDisabled,
        })}>
        {isDisabled ? <ChevronLeft className='size-4' /> : <PaginationPrevious href={href} />}
      </PaginationItem>
    ) : (
      <PaginationItem
        className={cn({
          'bg-slate-300/50 dark:bg-slate-800/50': isDisabled,
        })}>
        {isDisabled ? <ChevronRight className='size-4' /> : <PaginationNext href={href} />}
      </PaginationItem>
    );

  return item;
}
