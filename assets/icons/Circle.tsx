//https://lucide.dev/icons/credit-card
import type { SVGProps } from 'react';

const Circle: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='circle'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <circle cx={12} cy={12} r={10} />
    </svg>
  );
};

export default Circle;
