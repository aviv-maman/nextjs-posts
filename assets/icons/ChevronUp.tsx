//https://lucide.dev/icons/chevron-up
import type { SVGProps } from 'react';

const ChevronUp: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='up'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='m18 15-6-6-6 6' />
    </svg>
  );
};

export default ChevronUp;
