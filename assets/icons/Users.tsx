//https://lucide.dev/icons/users
import type { SVGProps } from 'react';

const Users: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='users'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
      <circle cx={9} cy={7} r={4} />
      <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
      <path d='M16 3.13a4 4 0 0 1 0 7.75' />
    </svg>
  );
};

export default Users;
