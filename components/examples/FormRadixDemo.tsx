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

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Zod: Please provide an email address')
    .email({ message: 'Zod: Please provide a valid email' }),
  password: z
    .string()
    .trim()
    .min(1, 'Zod: Password is required')
    .min(6, 'Zod: Password must be at least 6 characters')
    .max(32, 'Zod: Password must be less than 32 characters'),
  username: z.string().min(1, 'Zod: Username is required').min(5, 'Zod: Username must be at least 5 characters'),
});
type FlattenedErrors = z.inferFlattenedErrors<typeof formSchema>;

export function FormRadixDemo() {
  const [zodErrors, setZodErrors] = useState<{
    fieldErrors?: FlattenedErrors['fieldErrors'];
    formError?: string;
    serverErrors?: FlattenedErrors['fieldErrors'] & { general?: string };
  }>({});

  const customEmailValidation = (value: string, formData: FormData) => {
    const rawFormData = Object.fromEntries(formData);
    const errors = formSchema.safeParse(rawFormData).error?.flatten();

    if (errors?.fieldErrors.email) {
      setZodErrors((prevState) => ({
        ...prevState,
        formError: errors.formErrors?.[0],
        fieldErrors: { email: errors.fieldErrors.email },
      }));
      return true;
    }
    return false;
  };

  const customUsernameValidation = (value: string, formData: FormData) => {
    const rawFormData = Object.fromEntries(formData);
    const errors = formSchema.safeParse(rawFormData).error?.flatten();

    if (errors?.fieldErrors.username) {
      setZodErrors((prevState) => ({
        ...prevState,
        formError: errors.formErrors?.[0],
        fieldErrors: { username: errors.fieldErrors.username },
      }));
      return true;
    }
    return false;
  };

  const customPasswordValidation = (value: string, formData: FormData) => {
    const rawFormData = Object.fromEntries(formData);
    const errors = formSchema.safeParse(rawFormData).error?.flatten();

    if (errors?.fieldErrors.password) {
      setZodErrors((prevState) => ({
        ...prevState,
        formError: errors.formErrors?.[0],
        fieldErrors: { password: errors.fieldErrors.password },
      }));
      return true;
    }
    return false;
  };

  type FormState =
    | {
        actionErrors?: {
          formErrors?: FlattenedErrors['fieldErrors'] & { general?: string[] };
          serverErrors?: FlattenedErrors['fieldErrors'] & { general?: string[] };
        };
        result?: { success: boolean };
      }
    | undefined;
  async function authenticate(prevState: FormState, formData: FormData): Promise<FormState> {
    const rawFormData = Object.fromEntries(formData);
    const validatedFields = formSchema.safeParse(rawFormData);
    if (!validatedFields.success) {
      return {
        actionErrors: { formErrors: { general: validatedFields.error.flatten().formErrors } },
      };
    }
    if (validatedFields.data.email !== 'b@b.com') {
      console.log('email');

      return {
        actionErrors: { serverErrors: { email: ['Only b@b.com is allowed'], general: ['Internal Server Error'] } },
      };
    }
    try {
      //await signIn(validatedFields.data.provider, formData);
      console.log('Sign In');
      return { result: { success: true } };
    } catch (error: any) {
      return {
        actionErrors: { serverErrors: { general: [String(error.message || 'Something went wrong')] } },
      };
    }
  }
  const [formState, formAction] = useFormState(authenticate, undefined);

  return (
    <section className='flex flex-col space-y-2'>
      <FormRoot
        className='space-y-4'
        action={formAction}
        onClearServerErrors={() =>
          setZodErrors((prevState) => ({ ...prevState, formError: undefined, serverErrors: undefined }))
        }>
        {/* Email Field */}
        <FormField name='email' serverInvalid={Boolean(formState?.actionErrors?.serverErrors?.email)}>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type='email' placeholder='Enter your email' />
          </FormControl>
          <FormDescription>Your email address</FormDescription>
          <FormMessage match='typeMismatch'>Please provide a valid email.</FormMessage>
          <FormMessage match={customEmailValidation}>{zodErrors.fieldErrors?.email?.[0]}</FormMessage>
          {formState?.actionErrors?.serverErrors?.email?.[0] && (
            <FormMessage>{formState?.actionErrors?.serverErrors?.email?.[0]}</FormMessage>
          )}
        </FormField>

        {/* Username Field */}
        <FormField name='username' serverInvalid={Boolean(formState?.actionErrors?.serverErrors?.username)}>
          <FormLabel>Username</FormLabel>
          <FormValidityState>
            {(validity) => (
              <FormControl aria-invalid={validity?.valid === false}>
                <Input type='text' placeholder='Enter your username' required />
              </FormControl>
            )}
          </FormValidityState>
          <FormDescription>Your username</FormDescription>
          <FormMessage match='typeMismatch'>Please provide a valid username.</FormMessage>
          <FormMessage match={customUsernameValidation}>{zodErrors?.fieldErrors?.username?.[0]}</FormMessage>
          {formState?.actionErrors?.serverErrors?.username?.[0] && (
            <FormMessage>{formState.actionErrors?.serverErrors.username[0]}</FormMessage>
          )}
        </FormField>

        {/* Password Field */}
        <FormField name='password' serverInvalid={Boolean(formState?.actionErrors?.serverErrors?.password)}>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type='password' placeholder='Enter your password' />
          </FormControl>
          <FormDescription>Your password</FormDescription>
          <FormMessage match='typeMismatch'>Please provide a valid password.</FormMessage>
          <FormMessage match={customPasswordValidation}>{zodErrors?.fieldErrors?.password?.[0]}</FormMessage>
          {formState?.actionErrors?.serverErrors?.password?.[0] && (
            <FormMessage>{formState.actionErrors?.serverErrors.password[0]}</FormMessage>
          )}
        </FormField>

        {/* Form Error */}
        <FormDescription className='text-destructive'>
          {zodErrors.formError ||
            formState?.actionErrors?.formErrors?.general?.[0] ||
            formState?.actionErrors?.serverErrors?.general?.[0]}
        </FormDescription>

        {/* Submit Button */}
        <FormSubmit asChild className='mt-2.5'>
          <Button type='submit'>Submit</Button>
        </FormSubmit>
      </FormRoot>
    </section>
  );
}
