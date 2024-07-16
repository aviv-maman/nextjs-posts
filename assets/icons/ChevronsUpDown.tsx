//https://lucide.dev/icons/chevrons-up-down
import type { SVGProps } from 'react';

const ChevronsUpDown: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='chevrons up down'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='m7 15 5 5 5-5' />
      <path d='m7 9 5-5 5 5' />
    </svg>
  );
};

export default ChevronsUpDown;
