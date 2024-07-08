'use client';

import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export function CollapsibleDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className='flex w-min flex-col gap-y-4'>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className='w-[350px] space-y-2'>
        <div className='flex items-center justify-between space-x-4 px-4'>
          <h4 className='text-sm font-semibold'>@radix-ui starred 3 repositories</h4>
          <CollapsibleTrigger asChild>
            <Button variant='ghost' size='sm' className='w-9 p-0'>
              <ChevronsUpDown className='size-4' />
              <span className='sr-only'>Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className='rounded-md border px-4 py-3 font-mono text-sm'>@radix-ui/primitives</div>
        <CollapsibleContent className='space-y-2'>
          <div className='rounded-md border px-4 py-3 font-mono text-sm'>@radix-ui/colors</div>
          <div className='rounded-md border px-4 py-3 font-mono text-sm'>@stitches/react</div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
        <CollapsibleContent>
          Yes. Free to use for personal and commercial projects. No attribution required.
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
}
