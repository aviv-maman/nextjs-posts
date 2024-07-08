import { Badge } from '@/components/ui/badge';

export function BadgeDemo() {
  return (
    <section className='flex gap-x-4'>
      <Badge>Badge</Badge>
      <Badge variant='secondary'>Secondary</Badge>
      <Badge variant='outline'>Outline</Badge>
      <Badge variant='destructive'>Destructive</Badge>
    </section>
  );
}
