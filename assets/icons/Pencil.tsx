//https://lucide.dev/icons/pencil
import type { SVGProps } from 'react';

const Pencil: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='edit'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z' />
      <path d='m15 5 4 4' />
    </svg>
  );
};

export default Pencil;