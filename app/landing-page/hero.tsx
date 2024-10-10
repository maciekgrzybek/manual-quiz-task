import Image from 'next/image';
import { Text } from '@/design-system/text/text';
import Button from '@/design-system/button/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="bg-brand-primary-400 md:bg-[url('/images/hero-bg.png')] md:bg-cover md:bg-center xl:bg-right-bottom lg:bg-no-repeat max-w-[1650px] mx-auto h-[75vh] lg:h-[750px] min-h-[500px] max-h-[750px]">
      <div className="h-full flex flex-col justify-between mx-auto px-4 py-8 md:px-6 lg:px-10 max-w-[1000px]">
        <div>
          <Link href="https://www.manual.co/" target="_blank">
            <Image src="/images/logo.svg" width={40} height={40} alt="Logo" />
          </Link>
        </div>
        <div className="flex flex-col items-start justify-center md:max-w-[500px]">
          <Text variant="h1" className="text-brand-primary-600 mb-6">
            Be good to yourself
          </Text>
          <Text variant="body" className="mb-10 text-brand-primary-600">
            We're working around the clock to bring you a holistic approach to
            your wellness. From top to bottom, inside and out.
          </Text>
          <Button>TAKE THE QUIZ</Button>
        </div>
        <div></div>
      </div>
    </div>
  );
}
