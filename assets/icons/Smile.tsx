//https://lucide.dev/icons/smile
import type { SVGProps } from 'react';

const Smile: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='smile'
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
      <path d='M8 14s1.5 2 4 2 4-2 4-2' />
      <line x1={9} x2={9.01} y1={9} y2={9} />
      <line x1={15} x2={15.01} y1={9} y2={9} />
    </svg>
  );
};

export default Smile;
