import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

type SliderProps = React.ComponentProps<typeof Slider>;

export function SliderDemo({ className, ...props }: SliderProps) {
  return (
    <section className='w-full sm:w-[384px]'>
      <Slider defaultValue={[50]} max={100} step={1} className={cn('w-full', className)} {...props} />
    </section>
  );
}
