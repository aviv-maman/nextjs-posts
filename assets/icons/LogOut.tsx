//https://lucide.dev/icons/log-out
import type { SVGProps } from 'react';

const LogOut: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='log out'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
      <polyline points='16 17 21 12 16 7' />
      <line x1={21} x2={9} y1={12} y2={12} />
    </svg>
  );
};

export default LogOut;
