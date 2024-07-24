'use server';

import { validateRequest } from '@/lib/auth';
import { sql } from '@/lib/db';

export type AddGenericItemState =
  | {
      errors?: { title?: string[]; content?: string[] } & { general?: string[] };
      result?: { success: boolean; id: string };
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

    const record = await sql(
      `INSERT INTO generic_item (title, content, is_published, is_private, images, tags, website, owner_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id`,
      [title, content, 1, 0, JSON.stringify(imageUrls), JSON.stringify(tags), website, user.id],
    );

    return { result: { success: true, id: record[0]?.id } };
  } catch (error) {
    const err = error instanceof Error ? error.message : 'Something went wrong';
    return {
      errors: { general: [err] },
    };
  }
};
