//https://lucide.dev/icons/calculator
import type { SVGProps } from 'react';

const Calculator: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='calculator'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <rect width={16} height={20} x={4} y={2} rx={2} />
      <line x1={8} x2={16} y1={6} y2={6} />
      <line x1={16} x2={16} y1={14} y2={18} />
      <path d='M16 10h.01' />
      <path d='M12 10h.01' />
      <path d='M8 10h.01' />
      <path d='M12 14h.01' />
      <path d='M8 14h.01' />
      <path d='M12 18h.01' />
      <path d='M8 18h.01' />
    </svg>
  );
};

export default Calculator;
