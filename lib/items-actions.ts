'use server';

import { neon } from '@neondatabase/serverless';
import { generateId } from 'lucia';
import { validateRequest } from './auth';

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
  const tags = rawFormData['tags'].toString().split(',');
  const website = rawFormData['website'];
  const images = formData.getAll('images').filter((image) => image instanceof File && image.name !== '');
  const imageUrls = ['/1.jpg', '/2.jpg', '/3.jpg', '/4.jpg'] as string[];

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

    // db.prepare(
    //   'INSERT INTO generic_item (id, title, content, is_published, is_private, images, tags, website, owner_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    // ).run(itemId, title, content, 1, 0, JSON.stringify(imageUrls), JSON.stringify(tags), website, user.id);

    const sql = neon(process.env.DATABASE_URL!);

    // await sql`CREATE TABLE IF NOT EXISTS generic_item
    // (id TEXT NOT NULL PRIMARY KEY,
    // title TEXT NOT NULL,
    // content TEXT NOT NULL,
    // is_published INTEGER NOT NULL,
    // is_private INTEGER NOT NULL,
    // images JSONB NOT NULL,
    // tags JSONB NOT NULL,
    // website VARCHAR(255),
    // created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    // updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    // owner_id TEXT NOT NULL,
    // FOREIGN KEY (owner_id) REFERENCES user(id)
    // )`;

    await sql`CREATE TABLE IF NOT EXISTS generic_item
              (id TEXT NOT NULL PRIMARY KEY,
              title TEXT NOT NULL,
              content TEXT NOT NULL,
              is_published INTEGER NOT NULL,
              is_private INTEGER NOT NULL,
              images JSONB NOT NULL,
              tags JSONB NOT NULL,
              website VARCHAR(255),
              created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
              owner_id TEXT NOT NULL
              )`;
    await sql(
      `
      INSERT INTO generic_item (id, title, content, is_published, is_private, images, tags, website, owner_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
      [itemId, title, content, 1, 0, JSON.stringify(imageUrls), JSON.stringify(tags), website, user.id],
    );

    return { result: { success: true } };
  } catch (error) {
    const err = error instanceof Error ? error.message : 'Something went wrong';
    return {
      errors: { general: [err] },
    };
  }
};
