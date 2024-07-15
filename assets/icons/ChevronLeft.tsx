//https://lucide.dev/icons/chevron-left
import type { SVGProps } from 'react';

const ChevronLeft: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='left'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='m15 18-6-6 6-6' />
    </svg>
  );
};

export default ChevronLeft;
