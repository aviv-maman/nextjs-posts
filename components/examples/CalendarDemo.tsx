'use client';

import { Button } from '../ui/button';
import { useState } from 'react';
import { CalendarDays } from '@/assets/icons';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <section className='flex w-min flex-col gap-y-4'>
      <Calendar mode='single' selected={date} onSelect={setDate} className='rounded-md border' />

      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'outline'} className={cn('w-[240px] pl-3 text-left font-normal')}>
            <CalendarDays className='ml-auto size-4 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='single'
            disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </section>
  );
}
