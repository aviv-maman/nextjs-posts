'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsClient } from '@/hooks/use-is-client';

const LanguageSelect: React.FC = () => {
  const isClient = useIsClient();

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
