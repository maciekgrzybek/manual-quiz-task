import Image from 'next/image';
import { Text } from '@/design-system/text/text';

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
  const bgNum = index.toString();
  const bgNumPosition =
    direction === 'text-first'
      ? 'md:left-[80%] lg:left-0'
      : 'md:right-[80%] lg:left-[-65%]';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-24 items-center overflow-hidden">
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
          <div
            className={`absolute inset-0 after:content-["0${bgNum}"] after:absolute after:text-[70vw] sm:after:text-[15rem] after:font-bold
        after:text-brand-primary-100 after:z-[-1]
        after:inset-0 after:flex after:items-center after:justify-center
        md:after:text-[25rem] lg:after:text-[28rem] ${bgNumPosition}
        lg:after:items-center lg:after:justify-start`}
          ></div>
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
