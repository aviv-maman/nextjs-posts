//https://lucide.dev/icons/arrow-right
import type { SVGProps } from 'react';

const ArrowRight: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='right'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='M5 12h14' />
      <path d='m12 5 7 7-7 7' />
    </svg>
  );
};

export default ArrowRight;
