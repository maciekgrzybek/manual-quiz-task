import { Text } from '@/design-system/text/text';
import Hero from './landing-page/hero';

import Footer from './landing-page/footer';

import HelpSection, {
  Props as HelpSectionProps,
} from './landing-page/help-section';

const helpSections: Omit<HelpSectionProps, 'index' | 'direction'>[] = [
  {
    title: "Hair loss needn't be irreversible. We can help!",
    category: 'HAIR LOSS',
    description:
      'we&#39;re working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out.',
    image: {
      src: '/images/hair-loss.webp',
      alt: 'Hair loss man',
      width: 370,
      height: 445,
    },
  },
  {
    title: 'Erections can be a tricky thing. But no need to feel down!',
    category: 'Erectile dysfunction',
    description:
      'we&#39;re working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out.',
    image: {
      src: '/images/erectile-dysfunction.webp',
      alt: 'Erectile dysfunction man smiling',
      width: 370,
      height: 445,
    },
  },
];

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <Text
          variant="h2"
          className="text-brand-primary-600 text-center py-20 md:py-[70px] px-4"
        >
          What we can help with
        </Text>
        <section className="mb-20 md:mb-24">
          <div className="mx-auto px-4 max-w-[850px]">
            <div className="gap-20 flex flex-col md:gap-28 lg:gap-44">
              {helpSections.map((section, index) => (
                <HelpSection
                  key={section.title}
                  {...section}
                  direction={index % 2 === 0 ? 'image-first' : 'text-first'}
                  index={index + 1}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
