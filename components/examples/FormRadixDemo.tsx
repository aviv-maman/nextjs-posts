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
  const [clientErrors, setClientErrors] = useState<FlattenedErrors>();

  const customEmailValidation = (value: string, formData: FormData) => {
    const rawFormData = Object.fromEntries(formData);
    const errors = formSchema.safeParse(rawFormData).error?.flatten();

    if (errors?.fieldErrors.email) {
      setClientErrors(() => errors);
      return true;
    }
    return false;
  };

  const customUsernameValidation = (value: string, formData: FormData) => {
    const rawFormData = Object.fromEntries(formData);
    const errors = formSchema.safeParse(rawFormData).error?.flatten();

    if (errors?.fieldErrors.username) {
      setClientErrors(() => errors);
      return true;
    }
    return false;
  };

  const customPasswordValidation = (value: string, formData: FormData) => {
    const rawFormData = Object.fromEntries(formData);
    const errors = formSchema.safeParse(rawFormData).error?.flatten();

    if (errors?.fieldErrors.password) {
      setClientErrors(() => errors);
      return true;
    }
    return false;
  };

  type ActionState =
    | {
        errors?: FlattenedErrors['fieldErrors'] & { general?: string[] };
        result?: { success: boolean };
      }
    | undefined;

  async function authenticate(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const rawFormData = Object.fromEntries(formData);
    const validatedFields = formSchema.safeParse(rawFormData);
    if (!validatedFields.success) {
      return { errors: { general: validatedFields.error.flatten().formErrors } };
    }
    if (validatedFields.data.email !== 'b@b.com') {
      return { errors: { email: ['Only b@b.com is allowed'], general: ['Internal Server Error'] } };
    }
    try {
      //await signIn(validatedFields.data.provider, formData);
      return { result: { success: true } };
    } catch (error: any) {
      return {
        errors: { general: [String(error.message || 'Something went wrong')] },
      };
    }
  }
  const [actionState, formAction] = useFormState(authenticate, undefined);

  return (
    <section className='flex flex-col space-y-2'>
      <FormRoot className='space-y-4' action={formAction}>
        {/* Email Field */}
        <FormField name='email' serverInvalid={Boolean(actionState?.errors?.email)}>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder='Enter your email' />
          </FormControl>
          <FormDescription>Your email address</FormDescription>
          <div className='flex flex-col'>
            <FormMessage match={customEmailValidation}>{clientErrors?.fieldErrors?.email?.[0]}</FormMessage>
            {actionState?.errors?.email?.[0] && <FormMessage>{actionState?.errors?.email?.[0]}</FormMessage>}
          </div>
        </FormField>

        {/* Username Field */}
        <FormField name='username' serverInvalid={Boolean(actionState?.errors?.username)}>
          <FormLabel>Username</FormLabel>
          <FormValidityState>
            {(validity) => (
              <FormControl aria-invalid={validity?.valid === false}>
                <Input type='text' placeholder='Enter your username' required />
              </FormControl>
            )}
          </FormValidityState>
          <FormDescription>Your username</FormDescription>
          <div className='flex flex-col'>
            <FormMessage match='typeMismatch'>typeMismatch: Please provide a valid username.</FormMessage>
            <FormMessage match={customUsernameValidation}>{clientErrors?.fieldErrors?.username?.[0]}</FormMessage>
          </div>
          {actionState?.errors?.username?.[0] && <FormMessage>{actionState.errors.username[0]}</FormMessage>}
        </FormField>

        {/* Password Field */}
        <FormField name='password' serverInvalid={Boolean(actionState?.errors?.password)}>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type='password' placeholder='Enter your password' />
          </FormControl>
          <FormDescription>Your password</FormDescription>
          <div className='flex flex-col'>
            <FormMessage match='typeMismatch'>typeMismatch: Please provide a valid password.</FormMessage>
            <FormMessage match={customPasswordValidation}>{clientErrors?.fieldErrors?.password?.[0]}</FormMessage>
          </div>
          {actionState?.errors?.password?.[0] && <FormMessage>{actionState.errors.password[0]}</FormMessage>}
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
