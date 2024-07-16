//https://lucide.dev/icons/circle-plus
import type { SVGProps } from 'react';

const PlusCircle: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='plus'
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
      <path d='M8 12h8' />
      <path d='M12 8v8' />
    </svg>
  );
};

export default PlusCircle;
