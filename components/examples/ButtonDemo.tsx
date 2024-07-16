import Link from 'next/link';
import { ChevronRight, LoaderCircle, Mail } from '@/assets/icons';
import { Button, buttonVariants } from '@/components/ui/button';

export function ButtonDemo() {
  return (
    <section className='flex flex-col gap-y-4'>
      <Button>Primary</Button>

      <Link href='/login' className={buttonVariants({ variant: 'outline' })}>
        Link as Button
      </Link>

      <Button asChild>
        <Link href='/login'>Button as Link</Link>
      </Button>

      <Button variant='secondary'>Secondary</Button>
      <Button variant='destructive'>Destructive</Button>
      <Button variant='outline'>Outline</Button>
      <Button variant='ghost'>Ghost</Button>
      <Button variant='link'>Link</Button>
      <Button variant='outline' size='icon'>
        <ChevronRight className='size-4' />
      </Button>
      <Button>
        <Mail className='mr-2 size-4' /> Login with Email
      </Button>
      <Button disabled>
        <LoaderCircle className='mr-2 size-4 animate-spin' />
        Please wait
      </Button>
    </section>
  );
}
