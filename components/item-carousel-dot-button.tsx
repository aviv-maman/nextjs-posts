import type { EmblaCarouselType } from 'embla-carousel';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { Circle, CircleFilled } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (emblaApi: EmblaCarouselType | undefined): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

export const DotButton = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & { selectedIndex?: boolean }
>(({ className, variant = 'outline', size = 'icon', selectedIndex, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn('size-8 rounded-full border-none hover:bg-background', className)}
      type='button'
      {...props}>
      {selectedIndex ? <CircleFilled className='size-4' /> : <Circle className='size-4' />}
      <span className='sr-only'>Previous slide</span>
    </Button>
  );
});
DotButton.displayName = 'DotButton';
