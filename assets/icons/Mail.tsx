//https://lucide.dev/icons/mail
import type { SVGProps } from 'react';

const Mail: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='mail'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <rect width='20' height='16' x='2' y='4' rx='2' />
      <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
    </svg>
  );
};

export default Mail;
