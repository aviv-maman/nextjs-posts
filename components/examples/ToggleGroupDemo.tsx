import { Bold, Italic, Underline } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export function ToggleGroupDemo() {
  return (
    <section className='flex flex-col gap-y-4'>
      <ToggleGroup type='multiple'>
        <ToggleGroupItem value='bold' aria-label='Toggle bold'>
          <Bold className='size-4' />
        </ToggleGroupItem>
        <ToggleGroupItem value='italic' aria-label='Toggle italic'>
          <Italic className='size-4' />
        </ToggleGroupItem>
        <ToggleGroupItem value='underline' aria-label='Toggle underline'>
          <Underline className='size-4' />
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup variant='outline' type='multiple'>
        <ToggleGroupItem value='bold' aria-label='Toggle bold'>
          <Bold className='size-4' />
        </ToggleGroupItem>
        <ToggleGroupItem value='italic' aria-label='Toggle italic'>
          <Italic className='size-4' />
        </ToggleGroupItem>
        <ToggleGroupItem value='underline' aria-label='Toggle underline'>
          <Underline className='size-4' />
        </ToggleGroupItem>
      </ToggleGroup>
    </section>
  );
}
