//https://lucide.dev/icons/search
import type { SVGProps } from 'react';

const Search: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='search'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <circle cx={11} cy={11} r={8} />
      <path d='m21 21-4.3-4.3' />
    </svg>
  );
};

export default Search;
