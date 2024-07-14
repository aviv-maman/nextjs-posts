//https://lucide.dev/icons/user
import type { SVGProps } from 'react';

const User: React.FC<SVGProps<SVGSVGElement>> = (props) => {
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
      <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
      <circle cx={12} cy={7} r={4} />
    </svg>
  );
};

export default User;
