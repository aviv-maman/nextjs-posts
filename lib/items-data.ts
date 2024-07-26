'use server';

import { type DatabaseGenericItem, sql } from '@/lib/db';
import { artificialDelay } from '@/lib/utils';

export const fetchGenericItems = async (args?: { perPage?: number; currentPage?: number; query?: string }) => {
  const init = { perPage: 6, currentPage: 1, query: '', ...args };
  const offset = (init.currentPage - 1) * init.perPage;
  try {
    await artificialDelay(1000);
    const existingItems = (await sql`
        SELECT generic_items.id, generic_items.title, generic_items.content, generic_items.is_published,
        generic_items.is_private, generic_items.images, generic_items.tags, generic_items.website,
        generic_items.created_at, generic_items.updated_at, generic_items.owner_id, users.name AS owner_name,
        users.image_url AS owner_image
        FROM generic_items
        JOIN users ON users.id = generic_items.owner_id
        WHERE
        generic_items.title ILIKE ${`%${init.query}%`} OR
        generic_items.content ILIKE ${`%${init.query}%`}
        ORDER BY generic_items.created_at DESC
        LIMIT ${init.perPage}
        OFFSET ${offset}
    `) as (DatabaseGenericItem & { name?: string; image_url?: string })[] | [] | undefined;

    return { data: existingItems };
  } catch (error) {
    console.error('Database Error in fetchGenericItems:', error);
    const err = error instanceof Error ? error.message : 'Something went wrong';
    return { error: err };
  }
};

export const fetchItemQuantity = async (args?: { perPage?: number; query?: string }) => {
  const init = { perPage: 6, query: '', ...args };
  try {
    const res = (await sql`
      SELECT COUNT(*)
      FROM generic_items
      WHERE generic_items.title ILIKE ${`%${init.query}%`} OR
      generic_items.content ILIKE ${`%${init.query}%`}`) as [{ count: string }];
    const totalPages = Math.ceil(Number(res[0].count) / init.perPage);
    return { totalItems: Number(res[0].count), totalPages, perPage: init.perPage };
  } catch (error) {
    console.error('Database Error in fetchItemQuantity:', error);
    const err = error instanceof Error ? error.message : 'Something went wrong';
    return { error: err };
  }
};

export const fetchGenericItemById = async (id: string) => {
  try {
    await artificialDelay(1000);
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

export async function fetchItemsByOwnerId({
  ownerId,
  currentPage = 1,
  perPage = 5,
  query = '',
}: {
  ownerId: string;
  currentPage?: number;
  perPage?: number;
  query?: string;
}) {
  const offset = (currentPage - 1) * perPage;
  try {
    await artificialDelay(1000);
    const latestItems = (await sql`
      SELECT generic_items.id, generic_items.title, generic_items.content, generic_items.is_published,
      generic_items.is_private, generic_items.images, generic_items.tags, generic_items.website,
      generic_items.created_at, generic_items.updated_at, generic_items.owner_id, users.name AS owner_name,
      users.image_url AS owner_image
      FROM generic_items
      JOIN users ON users.id = generic_items.owner_id
      WHERE generic_items.owner_id = ${ownerId} AND
      generic_items.title ILIKE ${`%${query}%`} OR
      generic_items.content ILIKE ${`%${query}%`}
      ORDER BY generic_items.created_at DESC
      LIMIT ${perPage}
      OFFSET ${offset}`) as (DatabaseGenericItem & { name?: string; image_url?: string })[] | [] | undefined;
    return { data: latestItems };
  } catch (error) {
    console.error('Database Error in fetchItemsByOwnerId:', error);
    const err = error instanceof Error ? error.message : 'Failed to fetch items by owner id.';
    return { error: err };
  }
}

export const fetchItemQuantityByOwnerId = async (args: { ownerId: string; perPage?: number; query?: string }) => {
  const init = { perPage: 6, query: '', ...args };
  try {
    const res = (await sql`
      SELECT COUNT(*)
      FROM generic_items
      WHERE generic_items.title ILIKE ${`%${init.query}%`} OR
      generic_items.content ILIKE ${`%${init.query}%`}`) as [{ count: string }];
    const totalPages = Math.ceil(Number(res[0].count) / init.perPage);
    return { totalItems: Number(res[0].count), totalPages, perPage: init.perPage };
  } catch (error) {
    console.error('Database Error in fetchItemQuantityByOwnerId:', error);
    const err = error instanceof Error ? error.message : 'Something went wrong';
    return { error: err };
  }
};
