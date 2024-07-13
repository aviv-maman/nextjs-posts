//https://tabler.io/icons/icon/brand-linkedin
import type { SVGProps } from 'react';

const LinkedIn2: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='linkedin'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z' />
      <path d='M8 11l0 5' />
      <path d='M8 8l0 .01' />
      <path d='M12 16l0 -5' />
      <path d='M16 16v-3a2 2 0 0 0 -4 0' />
    </svg>
  );
};

export default LinkedIn2;