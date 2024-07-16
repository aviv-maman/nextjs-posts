//https://lucide.dev/icons/life-buoy
import type { SVGProps } from 'react';

const LifeBuoy: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='life buoy'
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
      <path d='m4.93 4.93 4.24 4.24' />
      <path d='m14.83 9.17 4.24-4.24' />
      <path d='m14.83 14.83 4.24 4.24' />
      <path d='m9.17 14.83-4.24 4.24' />
      <circle cx={12} cy={12} r={4} />
    </svg>
  );
};

export default LifeBuoy;
