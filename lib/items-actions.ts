'use server';

import { generateId } from 'lucia';
import { validateRequest } from './auth';
import type { DatabaseGenericItem } from '@/lib/db';
import { db } from '@/lib/db';

export type AddGenericItemState =
  | {
      errors?: { title?: string[]; content?: string[] } & { general?: string[] };
      result?: { success: boolean };
    }
  | undefined;

export const addGenericItem = async (
  prevState: AddGenericItemState,
  formData: FormData,
): Promise<AddGenericItemState> => {
  const rawFormData = Object.fromEntries(formData);
  const title = rawFormData['title'];
  const content = rawFormData['content'];
  const tags = rawFormData['tags'];
  const website = rawFormData['website'];
  const images = formData.getAll('images').filter((image) => image instanceof File && image.name !== '');
  const imageUrls = [] as string[];

  for (const imageFile of images) {
    if (typeof imageFile === 'string') {
      // Handle the case where image is a string.
      continue;
    }
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);
    // Convert the image data to base64
    const imageBase64 = imageData.toString('base64');
    // const result = await uploadImage();
    // imageUrls.push(result);
  }

  try {
    const { user } = await validateRequest();
    if (!user?.id) return { errors: { general: ['No user'] } };
    const itemId = generateId(15);

    db.prepare(
      'INSERT INTO generic_item (id, title, content, is_published, is_private, images, tags, website, owner_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    ).run(itemId, title, content, 1, 0, JSON.stringify(imageUrls), JSON.stringify(tags), website, user.id);

    return { result: { success: true } };
  } catch (error) {
    const err = error instanceof Error ? error.message : 'Something went wrong';
    return {
      errors: { general: [err] },
    };
  }
};

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
    const rawExistingItems = db
      .prepare(
        'SELECT * FROM generic_item LEFT JOIN user ON generic_item.owner_id = user.id ORDER BY generic_item.created_at DESC LIMIT ? OFFSET ?',
      )
      .all(perPage, offset) as DatabaseGenericItem[] | undefined;
    const existingItems = rawExistingItems?.map((row) => ({
      ...row,
      images: row.images ? (JSON.parse(row.images) as string[]) : null,
      tags: row.tags ? (JSON.parse(row.tags) as string[]) : null,
    }));
    //console.log(rawExistingItems);

    return { data: existingItems };
  } catch (error) {
    console.error('Database Error in fetchGenericItemsPages:', error);
    const err = error instanceof Error ? error.message : 'Something went wrong';
    return { data: [], error: err };
  }
};

export const fetchGenericItemsPages = async (perPage = 6, query?: string) => {
  try {
    const count = db
      .prepare(`SELECT COUNT(*) FROM generic_item JOIN user ON generic_item.owner_id = user.id`)
      .get() as { 'COUNT(*)': number };
    const totalPages = Math.ceil(Number(count['COUNT(*)']) / perPage);
    return { data: totalPages };
  } catch (error) {
    console.error('Database Error in fetchGenericItemsPages:', error);
    const err = error instanceof Error ? error.message : 'Something went wrong';
    return { data: 0, error: err };
  }
};

// const getGenericItem = async (id: string) => {
//   //db.exec(`DROP TABLE IF EXISTS generic_item`);
//   const rawExistingPermissions = db.prepare('SELECT * FROM generic_item WHERE user_id = ?').all(userId) as
//     | DatabasePermission[]
//     | undefined;
//   const existingPermissions = rawExistingPermissions?.map((row) => ({
//     ...row,
//     actions: JSON.parse(row.actions),
//     conditions: JSON.parse(row.conditions),
//   }));
//   console.log(existingPermissions);
// };
