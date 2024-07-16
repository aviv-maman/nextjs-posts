//https://lucide.dev/icons/check
import type { SVGProps } from 'react';

const Check: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='check'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='M20 6 9 17l-5-5' />
    </svg>
  );
};

export default Check;
