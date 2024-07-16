//https://lucide.dev/icons/bold
import type { SVGProps } from 'react';

const Bold: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='bold'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8' />
    </svg>
  );
};

export default Bold;