//https://lucide.dev/icons/circle-alert
import type { SVGProps } from 'react';

const AlertCircle: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='alert'
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
      <line x1={12} x2={12} y1={8} y2={12} />
      <line x1={12} x2={12.01} y1={16} y2={16} />
    </svg>
  );
};

export default AlertCircle;
