//https://tabler.io/icons/icon/circle
import type { SVGProps } from 'react';

const CircleFilled: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg aria-label='circle' width={24} height={24} viewBox='0 0 24 24' fill='currentColor' {...props}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M7 3.34a10 10 0 1 1 -4.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 4.995 -8.336z' />
    </svg>
  );
};

export default CircleFilled;
