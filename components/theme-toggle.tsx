'use client';

import { useTheme } from 'next-themes';
import { Computer, Moon, Sun } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const items = [
    { label: 'Light', icon: <Sun className='size-4' /> },
    { label: 'Dark', icon: <Moon className='size-4' /> },
    { label: 'System', icon: <Computer className='size-4' /> },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='size-8 bg-transparent'>
          <Sun className='size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {items.map((item) => {
          return (
            <DropdownMenuCheckboxItem
              key={item.label}
              className='cursor-pointer justify-between'
              onClick={() => setTheme(item.label.toLowerCase())}
              checked={item.label.toLowerCase() === theme}>
              <span>{item.label}</span>
              {item.icon}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
