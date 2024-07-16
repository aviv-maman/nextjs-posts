//https://lucide.dev/icons/keyboard
import type { SVGProps } from 'react';

const Keyboard: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='keyboard'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='M10 8h.01' />
      <path d='M12 12h.01' />
      <path d='M14 8h.01' />
      <path d='M16 12h.01' />
      <path d='M18 8h.01' />
      <path d='M6 8h.01' />
      <path d='M7 16h10' />
      <path d='M8 12h.01' />
      <rect width={20} height={16} x={2} y={4} rx={2} />
    </svg>
  );
};

export default Keyboard;
