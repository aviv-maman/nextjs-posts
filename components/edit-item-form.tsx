'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { z } from 'zod';
import { LoaderCircle, Pencil } from '@/assets/icons';
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
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '@/components/ui/multi-select';
import { editGenericItem } from '@/lib/items-actions';
import type { fetchGenericItemById } from '@/lib/items-data';

export const genericItemSchema = z.object({
  title: z.string().trim().min(1, { message: 'Zod: Please provide a title' }),
  content: z
    .string()
    .trim()
    .min(1, 'Zod: Content is required')
    .min(6, 'Zod: Content must be at least 6 characters')
    .max(2000, 'Zod: Content must be less than 32 characters'),
});
export type GenericItemSchemaErrors = z.inferFlattenedErrors<typeof genericItemSchema>;
export type GenericItemSchemaKeys = keyof z.infer<typeof genericItemSchema>;

export function EditItemForm({ item }: { item: Awaited<ReturnType<typeof fetchGenericItemById>>['data'] }) {
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

  const editGenericItemWithId = editGenericItem.bind(null, item?.id || '');
  const [actionState, formAction] = useFormState(editGenericItemWithId, undefined);

  const [tags, setTags] = useState(item?.tags || undefined);

  return (
    <div className='flex flex-col space-y-2'>
      <FormRoot className='space-y-4' action={formAction}>
        {/* Title Field */}
        <FormField name='title' serverInvalid={Boolean(actionState?.errors?.title)}>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input placeholder='Enter your title' required defaultValue={item?.title} />
          </FormControl>
          <FormDescription>The title of the new item</FormDescription>
          <div className='flex flex-col'>
            <FormMessage match='valueMissing'>valueMissing: Please provide a valid title.</FormMessage>
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
                <Input type='text' placeholder='Enter your content' required defaultValue={item?.content} />
              </FormControl>
            )}
          </FormValidityState>
          <FormDescription>The content of the new item</FormDescription>
          <div className='flex flex-col'>
            <FormMessage match='valueMissing'>valueMissing: Please provide a valid content.</FormMessage>
            <FormMessage match={(value, formData) => customFormValidation({ field: 'content', value, formData })}>
              {clientErrors?.fieldErrors?.content?.[0]}
            </FormMessage>
          </div>
          {actionState?.errors?.content?.[0] && <FormMessage>{actionState.errors.content[0]}</FormMessage>}
        </FormField>

        {/* Tag Selection */}
        <FormField name='tags'>
          <FormLabel>Tags</FormLabel>
          <FormControl>
            <Input type='text' placeholder='Select tags' className='hidden' value={tags} />
          </FormControl>
          <MultiSelector
            values={tags}
            onValuesChange={setTags}
            loop
            className='max-w-xs'
            defaultValue={item?.tags?.join(', ') || undefined}>
            <MultiSelectorTrigger>
              <MultiSelectorInput placeholder='Select tags' />
            </MultiSelectorTrigger>
            <MultiSelectorContent>
              <MultiSelectorList>
                <MultiSelectorItem value={'Summer'}>Summer</MultiSelectorItem>
                <MultiSelectorItem value={'Winter'}>Winter</MultiSelectorItem>
                <MultiSelectorItem value={'Spring'}>Spring</MultiSelectorItem>
                <MultiSelectorItem value={'Autumn'}>Autumn</MultiSelectorItem>
                <MultiSelectorItem value={'Europe'}>Europe</MultiSelectorItem>
                <MultiSelectorItem value={'US'}>US</MultiSelectorItem>
                <MultiSelectorItem value={'Middle-East'}>Middle-East</MultiSelectorItem>
                <MultiSelectorItem value={'Trip'}>Trip</MultiSelectorItem>
                <MultiSelectorItem value={'Views'}>Views</MultiSelectorItem>
              </MultiSelectorList>
            </MultiSelectorContent>
          </MultiSelector>
          <FormDescription>Select tags to describe the item content</FormDescription>
        </FormField>

        {/* Website Field */}
        <FormField name='website'>
          <FormLabel>Website</FormLabel>
          <FormControl>
            <Input placeholder='Enter a website' defaultValue={item?.website || undefined} />
          </FormControl>
          <FormDescription>Website</FormDescription>
        </FormField>

        {/* Form Error */}
        <FormDescription className='text-destructive'>
          {clientErrors?.formErrors?.[0] || actionState?.errors?.general?.[0]}
        </FormDescription>

        {/* Submit Button */}
        <FormSubmit asChild className='mt-2.5'>
          <SubmitButton />
        </FormSubmit>
      </FormRoot>
    </div>
  );
}

const SubmitButton: React.FC = () => {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' disabled={pending} aria-disabled={pending} variant='default' className='w-fit'>
      {pending ? <LoaderCircle className='mr-2 size-4 animate-spin' /> : <Pencil className='mr-2 size-4' />}
      <span>Edit</span>
    </Button>
  );
};
