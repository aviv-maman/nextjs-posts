//https://lucide.dev/icons/triangle-alert
import type { SVGProps } from 'react';

const TriangleAlert: React.FC<SVGProps<SVGSVGElement>> = (props) => {
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
      <path d='m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3' />
      <path d='M12 9v4' />
      <path d='M12 17h.01' />
    </svg>
  );
};

export default TriangleAlert;
