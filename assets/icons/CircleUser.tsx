//https://lucide.dev/icons/circle-user
import type { SVGProps } from 'react';

const CircleUser: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='user'
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
      <circle cx={12} cy={10} r={3} />
      <path d='M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662' />
    </svg>
  );
};

export default CircleUser;
