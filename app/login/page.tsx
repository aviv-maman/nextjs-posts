'use server';

import { redirect } from 'next/navigation';
import { GitHub, Google, Mail } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { validateRequest } from '@/lib/auth';

export default async function Page() {
  const { user } = await validateRequest();
  if (user) redirect('/');

  return (
    <section className='container relative flex h-[calc(100vh-150px)] flex-col p-6 sm:h-[calc(100vh-142px)] sm:justify-center sm:px-8'>
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-center text-2xl'>Login to FeedZ</CardTitle>
          <CardDescription>Choose your preferred way to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Button type='button' variant='default' className='bg-slate-700 hover:bg-slate-500'>
                <GitHub className='mr-2 size-5' />
                <span>Continue with GitHub</span>
              </Button>
              <Button type='button' variant='default' className='bg-red-600 hover:bg-red-400'>
                <Google className='mr-2 size-5' />
                <span>Continue with Google</span>
              </Button>
            </div>
            <div className='flex items-center space-x-2 text-xs text-muted-foreground'>
              <div className='w-full border-b' />
              <span>OR</span>
              <div className='w-full border-b' />
            </div>
            <div className='grid gap-2'>
              <Input id='email' type='email' placeholder='Email Address' required />
              <Button type='button' variant='default' className='bg-zinc-600 hover:bg-zinc-500'>
                <Mail className='mr-2 size-5' />
                <span>Continue with Email</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
