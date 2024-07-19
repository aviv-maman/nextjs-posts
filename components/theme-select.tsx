'use client';

import { useTheme } from 'next-themes';
import { Computer, Moon, Sun } from '@/assets/icons';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ThemeSelect: React.FC = () => {
  const items = [
    { label: 'Light', icon: <Sun className='size-4' /> },
    { label: 'Dark', icon: <Moon className='size-4' /> },
    { label: 'System', icon: <Computer className='size-4' /> },
  ];

  const { setTheme, theme } = useTheme();

  return (
    <Select onValueChange={(value) => setTheme(value)} defaultValue={theme || 'system'}>
      <SelectTrigger id='theme' aria-label='Select Theme'>
        <SelectValue placeholder='Select Theme' />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => {
          return (
            <SelectItem key={item.label} value={item.label.toLowerCase()}>
              <div className='flex gap-x-2'>
                {item.icon}
                <span>{item.label}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default ThemeSelect;
