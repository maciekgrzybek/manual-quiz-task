import Image from 'next/image';
import { Text } from '@/design-system';
import { BigNumberBg } from './big-number-bg';

interface ImageDetails {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface Props {
  image: ImageDetails;
  category: string;
  title: string;
  description: string;
  direction: 'image-first' | 'text-first';
  index: number;
}

export default function HelpSection({
  image,
  category,
  title,
  description,
  direction,
  index,
}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-24 lg:gap-[7.5rem] items-center overflow-hidden">
      <div
        className={`${
          direction === 'text-first' ? 'sm:order-2' : 'sm:order-1'
        }`}
      >
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          className="w-full h-auto"
        />
      </div>
      <div
        className={` ${
          direction === 'text-first' ? 'sm:order-1' : 'sm:order-2'
        }`}
      >
        <div className="max-w-sm mx-auto relative">
          <BigNumberBg
            index={index}
            position={direction === 'text-first' ? 'left' : 'right'}
          />

          <Text variant="h6" className="text-brand-primary-500 mb-4">
            {category.toUpperCase()}
          </Text>
          <Text variant="h4" className="text-brand-primary-600 mb-8">
            {title}
          </Text>
          <Text variant="body" className="text-brand-primary-600">
            {description}
          </Text>
        </div>
      </div>
    </div>
  );
}
