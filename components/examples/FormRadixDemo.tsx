'use client';

import { useState } from 'react';
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
import { cn } from '@/lib/utils';

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
  const [zodErrors, setZodErrors] = useState<FlattenedErrors['fieldErrors']>({});

  const customEmailValidation = (value: string, formData: FormData) => {
    const rawFormData = Object.fromEntries(formData);
    const emailErrors = formSchema.safeParse(rawFormData).error?.flatten().fieldErrors.email;

    if (emailErrors) {
      setZodErrors((prevState) => ({ ...prevState, email: emailErrors }));
      return true;
    }
    return false;
  };

  const customUsernameValidation = (value: string, formData: FormData) => {
    const rawFormData = Object.fromEntries(formData);
    const usernameErrors = formSchema.safeParse(rawFormData).error?.flatten().fieldErrors.username;

    if (usernameErrors) {
      setZodErrors((prevState) => ({ ...prevState, username: usernameErrors }));
      return true;
    }
    return false;
  };

  const customPasswordValidation = (value: string, formData: FormData) => {
    const rawFormData = Object.fromEntries(formData);
    const passwordErrors = formSchema.safeParse(rawFormData).error?.flatten().fieldErrors.password;

    if (passwordErrors) {
      setZodErrors((prevState) => ({ ...prevState, password: passwordErrors }));
      return true;
    }
    return false;
  };

  const [serverErrors, setServerErrors] = useState({ email: false, password: false, username: false });

  return (
    <section className='flex flex-col space-y-2'>
      <FormRoot
        className='space-y-4'
        onClearServerErrors={() => setServerErrors({ email: false, password: false, username: false })}>
        {/* Email Field */}
        <FormField name='email' serverInvalid={serverErrors.email}>
          <FormLabel>Email</FormLabel>
          <FormControl asChild>
            <Input
              type='email'
              placeholder='Enter your email'
              className={cn(
                'data-[invalid]:border-destructive data-[valid]:border-green-400 data-[invalid]:text-destructive data-[valid]:text-green-400',
              )}
            />
          </FormControl>
          <FormDescription>Your email address</FormDescription>
          <FormMessage match={customEmailValidation}>{zodErrors.email?.[0]}</FormMessage>
          <FormMessage match='typeMismatch' forceMatch={serverErrors.email}>
            Please provide a valid email.
          </FormMessage>
        </FormField>

        {/* Username Field */}
        <FormField name='username' serverInvalid={serverErrors.username}>
          <FormLabel className='data-[valid]:text-green-400'>Username</FormLabel>
          <FormValidityState>
            {(validity) => (
              <FormControl asChild>
                <Input
                  type='text'
                  placeholder='Enter your username'
                  aria-invalid={validity?.valid === false}
                  required
                  className={cn({
                    'border-destructive text-destructive': validity?.valid === false,
                    'border-green-400 text-green-400': validity?.valid,
                  })}
                />
              </FormControl>
            )}
          </FormValidityState>
          <FormDescription>Your username</FormDescription>
          <FormMessage match='typeMismatch' forceMatch={serverErrors.username}>
            Please provide a valid username.
          </FormMessage>
          <FormMessage match={customUsernameValidation}>{zodErrors.username?.[0]}</FormMessage>
        </FormField>

        {/* Password Field */}
        <FormField name='password' serverInvalid={serverErrors.password}>
          <FormLabel>Password</FormLabel>
          <FormControl asChild>
            <Input
              type='password'
              placeholder='Enter your password'
              className={cn(
                'data-[invalid]:border-destructive data-[valid]:border-green-400 data-[invalid]:text-destructive data-[valid]:text-green-400',
              )}
            />
          </FormControl>
          <FormDescription>Your password</FormDescription>
          <FormMessage match='typeMismatch' forceMatch={serverErrors.password}>
            Please provide a valid password.
          </FormMessage>
          <FormMessage match={customPasswordValidation}>{zodErrors.password?.[0]}</FormMessage>
        </FormField>

        {/* Form Error */}
        {/* <FormDescription className='text-destructive'>{serverErrors}</FormDescription> */}

        {/* Submit Button */}
        <FormSubmit asChild className='mt-2.5'>
          <Button type='submit'>Submit</Button>
        </FormSubmit>
      </FormRoot>
    </section>
  );
}
