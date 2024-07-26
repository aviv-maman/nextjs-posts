'use server';

import { type DatabaseGenericItem, sql } from '@/lib/db';
import { artificialDelay } from '@/lib/utils';

export const fetchGenericItems = async ({
  perPage = 6,
  currentPage = 1,
  query = '',
}: {
  perPage?: number;
  currentPage?: number;
  query?: string;
}) => {
  const offset = (currentPage - 1) * perPage;
  try {
    await artificialDelay(2000);
    const existingItems = (await sql`
        SELECT generic_items.id, generic_items.title, generic_items.content, generic_items.is_published,
        generic_items.is_private, generic_items.images, generic_items.tags, generic_items.website,
        generic_items.created_at, generic_items.updated_at, generic_items.owner_id, users.name AS owner_name,
        users.image_url AS owner_image
        FROM generic_items
        JOIN users ON users.id = generic_items.owner_id
        WHERE
        generic_items.title ILIKE ${`%${query}%`} OR
        generic_items.content ILIKE ${`%${query}%`}
        ORDER BY generic_items.created_at DESC
        LIMIT ${perPage}
        OFFSET ${offset}
    `) as (DatabaseGenericItem & { name?: string; image_url?: string })[] | [] | undefined;

    return { data: existingItems };
  } catch (error) {
    console.error('Database Error in fetchGenericItems:', error);
    const err = error instanceof Error ? error.message : 'Something went wrong';
    return { error: err };
  }
};

export const fetchGenericItemsPages = async ({ perPage = 6, query }: { perPage?: number; query?: string }) => {
  try {
    const res = (await sql`
      SELECT COUNT(*)
      FROM generic_items
      WHERE generic_items.title ILIKE ${`%${query}%`} OR
      generic_items.content ILIKE ${`%${query}%`}`) as [{ count: string }];
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
    await artificialDelay(2000);
    const res = await sql`
    SELECT generic_items.id, generic_items.title, generic_items.content, generic_items.is_published,
    generic_items.is_private, generic_items.images, generic_items.tags, generic_items.website,
    generic_items.created_at, generic_items.updated_at, generic_items.owner_id, users.name AS owner_name,
    users.image_url AS owner_image
    FROM generic_items
    JOIN users ON users.id = generic_items.owner_id
    WHERE generic_items.id = ${id}
    `;
    return { data: res[0] as (DatabaseGenericItem & { owner_name?: string; owner_image?: string }) | undefined };
  } catch (error) {
    console.error('Database Error in fetchGenericItem:', error);
    const err = error instanceof Error ? error.message : 'Something went wrong';
    return { error: err };
  }
};
