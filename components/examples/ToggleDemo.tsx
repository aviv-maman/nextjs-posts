import { Bold, Italic, Underline } from '@/assets/icons';
import { Toggle } from '@/components/ui/toggle';

export function ToggleDemo() {
  return (
    <section className='flex gap-x-4'>
      <Toggle aria-label='Toggle bold'>
        <Bold className='size-4' />
      </Toggle>

      <Toggle variant='outline' aria-label='Toggle italic'>
        <Italic className='size-4' />
      </Toggle>

      <Toggle aria-label='Toggle italic'>
        <Italic className='mr-2 size-4' />
        Italic
      </Toggle>

      <Toggle size='sm' aria-label='Toggle italic'>
        <Italic className='size-4' />
      </Toggle>

      <Toggle size='lg' aria-label='Toggle italic'>
        <Italic className='size-4' />
      </Toggle>

      <Toggle aria-label='Toggle underline' disabled>
        <Underline className='size-4' />
      </Toggle>
    </section>
  );
}
