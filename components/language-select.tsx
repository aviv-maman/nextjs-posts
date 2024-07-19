'use client';

import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

const LanguageSelect: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(() => true);
  }, []);

  if (!isClient) {
    return <Skeleton className='h-10 w-full rounded-md' />;
  }

  return (
    <Select>
      <SelectTrigger id='language' aria-label='Select Language'>
        <SelectValue placeholder='Select Language' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='clothing'>System</SelectItem>
        <SelectItem value='electronics'>English</SelectItem>
        <SelectItem value='accessories'>Hebrew</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSelect;
