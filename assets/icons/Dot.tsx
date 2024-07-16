//https://lucide.dev/icons/dot
import type { SVGProps } from 'react';

const Dot: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='dot'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <circle cx='12.1' cy='12.1' r='1' />
    </svg>
  );
};

export default Dot;
