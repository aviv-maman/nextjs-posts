//https://lucide.dev/icons/slash
import type { SVGProps } from 'react';

const Slash: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='slash'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='M22 2 2 22' />
    </svg>
  );
};

export default Slash;
