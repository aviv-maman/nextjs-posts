//https://lucide.dev/icons/languages
import type { SVGProps } from 'react';

const Languages: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='language'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='m5 8 6 6' />
      <path d='m4 14 6-6 2-3' />
      <path d='M2 5h12' />
      <path d='M7 2h1' />
      <path d='m22 22-5-10-5 10' />
      <path d='M14 18h6' />
    </svg>
  );
};

export default Languages;
