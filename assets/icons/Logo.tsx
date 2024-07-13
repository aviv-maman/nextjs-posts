//https://lucide.dev/icons/newspaper
import type { SVGProps } from 'react';

const Logo: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='logo'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2' />
      <path d='M18 14h-8' />
      <path d='M15 18h-5' />
      <path d='M10 6h8v4h-8V6Z' />
    </svg>
  );
};

export default Logo;