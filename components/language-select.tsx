'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LanguageSelect: React.FC = () => {
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
