'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { type DatabaseGenericItem, sql } from '@/lib/db';

export const fetchGenericItems = async ({
  perPage = 6,
  currentPage = 1,
  query = '',
}: {
  perPage?: number;
  currentPage?: number;
  query?: string;
}) => {
  noStore();
  const offset = (currentPage - 1) * perPage;
  try {
    const existingItems = (await sql`
        SELECT *
        FROM generic_item
        WHERE
        generic_item.title ILIKE ${`%${query}%`} OR
        generic_item.content ILIKE ${`%${query}%`}
        ORDER BY generic_item.created_at DESC
        LIMIT ${perPage}
        OFFSET ${offset}
    `) as DatabaseGenericItem[] | [];

    return { data: existingItems };
  } catch (error) {
    console.error('Database Error in fetchGenericItems:', error);
    const err = error instanceof Error ? error.message : 'Something went wrong';
    return { error: err };
  }
};

export const fetchGenericItemsPages = async ({ perPage = 6, query }: { perPage?: number; query?: string }) => {
  noStore();
  try {
    const res = (await sql`SELECT COUNT(*) FROM generic_item`) as [{ count: string }];
    const totalPages = Math.ceil(Number(res[0].count) / perPage);
    return { data: totalPages };
  } catch (error) {
    console.error('Database Error in fetchGenericItemsPages:', error);
    const err = error instanceof Error ? error.message : 'Something went wrong';
    return { data: 0, error: err };
  }
};

export const fetchGenericItemById = async (id: string) => {
  try {
    const res = await sql`SELECT * FROM generic_item WHERE generic_item.id = ${id}`;
    return { data: res[0] as DatabaseGenericItem | undefined };
  } catch (error) {
    console.error('Database Error in fetchGenericItem:', error);
    const err = error instanceof Error ? error.message : 'Something went wrong';
    return { error: err };
  }
};
