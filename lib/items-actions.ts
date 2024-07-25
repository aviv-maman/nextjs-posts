'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { validateRequest } from '@/lib/auth';
import cloudinary from '@/lib/cloudinary';
import { sql } from '@/lib/db';

export type AddGenericItemState = {
  errors?: { title?: string[]; content?: string[]; general?: string[] };
} | void;

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
  const imageUrls = [] as string[];

  let newId = '';
  try {
    const { user } = await validateRequest();
    if (!user?.id) return { errors: { general: ['No user'] } };

    // Upload image(s)
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
      const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
        folder: 'feedz',
      });
      imageUrls.push(result.secure_url);
    }

    const record = await sql(
      `INSERT INTO generic_items (title, content, is_published, is_private, images, tags, website, owner_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id`,
      [title, content, 1, 0, JSON.stringify(imageUrls), JSON.stringify(tags), website, user.id],
    );
    newId = record[0].id;
  } catch (error) {
    const err = error instanceof Error ? error.message : 'Something went wrong';
    return {
      errors: { general: [err] },
    };
  }
  // Revalidate the cache for the relevant pages and redirect the user
  revalidatePath('/feed');
  revalidatePath('/search');
  redirect(`/item/${newId}`);
};
