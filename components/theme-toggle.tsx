'use client';

import { Computer, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
  const { setTheme } = useTheme();

  const items = [
    { label: 'Light', icon: <Sun className='size-4' /> },
    { label: 'Dark', icon: <Moon className='size-4' /> },
    { label: 'System', icon: <Computer className='size-4' /> },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='size-9 bg-transparent'>
          <Sun className='size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {items.map((item) => {
          return (
            <DropdownMenuItem
              key={item.label}
              className='cursor-pointer justify-between'
              onClick={() => setTheme(item.label.toLowerCase())}>
              <span>{item.label}</span>
              {item.icon}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
