'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormRoot,
  FormSubmit,
  FormValidityState,
} from '@/components/ui/form-radix';
import { Input } from '@/components/ui/input';
import { addGenericItem } from '@/lib/items-actions';

export const genericItemSchema = z.object({
  title: z.string().trim().min(1, 'Zod: Please provide a title'),
  content: z
    .string()
    .trim()
    .min(1, 'Zod: Content is required')
    .min(6, 'Zod: Content must be at least 6 characters')
    .max(32, 'Zod: Content must be less than 32 characters'),
});
export type GenericItemSchemaErrors = z.inferFlattenedErrors<typeof genericItemSchema>;
export type GenericItemSchemaKeys = keyof z.infer<typeof genericItemSchema>;

export function FormRadixDemo() {
  const [clientErrors, setClientErrors] = useState<GenericItemSchemaErrors>();

  const customFormValidation = ({
    field,
    formData,
  }: {
    field: GenericItemSchemaKeys;
    value: string;
    formData: FormData;
  }) => {
    const rawFormData = Object.fromEntries(formData);
    const errors = genericItemSchema.safeParse(rawFormData).error?.flatten();

    if (field === 'title' && errors?.fieldErrors.title) {
      setClientErrors(() => errors);
      return true;
    }
    if (field === 'content' && errors?.fieldErrors.content) {
      setClientErrors(() => errors);
      return true;
    }
    return false;
  };

  const [actionState, formAction] = useFormState(addGenericItem, undefined);

  return (
    <section className='flex flex-col space-y-2'>
      <FormRoot className='space-y-4' action={formAction}>
        {/* Title Field */}
        <FormField name='title' serverInvalid={Boolean(actionState?.errors?.title)}>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input placeholder='Enter your title' />
          </FormControl>
          <FormDescription>Your title</FormDescription>
          <div className='flex flex-col'>
            <FormMessage match={(value, formData) => customFormValidation({ field: 'title', value, formData })}>
              {clientErrors?.fieldErrors?.title?.[0]}
            </FormMessage>
            {actionState?.errors?.title?.[0] && <FormMessage>{actionState?.errors?.title?.[0]}</FormMessage>}
          </div>
        </FormField>

        {/* Content Field */}
        <FormField name='content' serverInvalid={Boolean(actionState?.errors?.content)}>
          <FormLabel>Content</FormLabel>
          <FormValidityState>
            {(validity) => (
              <FormControl aria-invalid={validity?.valid === false}>
                <Input type='text' placeholder='Enter your content' required />
              </FormControl>
            )}
          </FormValidityState>
          <FormDescription>Your Content</FormDescription>
          <div className='flex flex-col'>
            <FormMessage match='typeMismatch'>typeMismatch: Please provide a valid content.</FormMessage>
            <FormMessage match={(value, formData) => customFormValidation({ field: 'content', value, formData })}>
              {clientErrors?.fieldErrors?.content?.[0]}
            </FormMessage>
          </div>
          {actionState?.errors?.content?.[0] && <FormMessage>{actionState.errors.content[0]}</FormMessage>}
        </FormField>

        {/* Form Error */}
        <FormDescription className='text-destructive'>
          {clientErrors?.formErrors?.[0] || actionState?.errors?.general?.[0]}
        </FormDescription>

        {/* Submit Button */}
        <FormSubmit asChild className='mt-2.5'>
          <Button type='submit'>Submit</Button>
        </FormSubmit>
      </FormRoot>
    </section>
  );
}
