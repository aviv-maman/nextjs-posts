import type { EmblaCarouselType } from 'embla-carousel';
import type { ComponentPropsWithRef } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from '@/assets/icons';
import { Button } from '@/components/ui/button';

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = ComponentPropsWithRef<'button'>;

export const PrevButton: React.FC<PropType> = (props) => {
  return (
    <Button variant='outline' size='icon' className='size-8 rounded-full' type='button' {...props}>
      <ArrowLeft className='size-4' />
      <span className='sr-only'>Previous slide</span>
    </Button>
  );
};

export const NextButton: React.FC<PropType> = (props) => {
  return (
    <Button variant='outline' size='icon' className='size-8 rounded-full' type='button' {...props}>
      <ArrowRight className='size-4' />
      <span className='sr-only'>Next slide</span>
    </Button>
  );
};
