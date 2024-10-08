'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { PlaceholderBase64 } from '@/assets/images';
import { NextButton, PrevButton, usePrevNextButtons } from '@/components/item-carousel-arrow-buttons';
import { DotButton, useDotButton } from '@/components/item-carousel-dot-button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import '@/styles/embla.css';

interface ItemCarouselProps {
  images?: string[] | null;
}

const ItemCarousel: React.FC<ItemCarouselProps> = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' });
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <section className='embla space-y-2'>
      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container'>
          {images?.map((value, index) => (
            <div className='embla__slide w-full' key={index}>
              <div className='embla__slide__number'>
                <AspectRatio ratio={16 / 9} className='rounded-md'>
                  <Image
                    src={value || '/placeholder.svg'}
                    alt={`Photo ${index + 1}`}
                    fill
                    className='rounded-md object-cover'
                    quality={100}
                    placeholder={`data:image/svg+xml;base64,${PlaceholderBase64}`}
                  />
                </AspectRatio>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='embla__controls'>
        <div className='embla__buttons'>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className='embla__dots'>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={cn('text-muted-foreground/70', { 'text-current': index === selectedIndex })}
              selectedIndex={index === selectedIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItemCarousel;
