import { Text } from '@/design-system';
import Hero from './landing-page/hero';

import Footer from './landing-page/footer';
import { HelpSectionsWrapper } from './landing-page/help-sections-wrapper';

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
        <HelpSectionsWrapper />
      </main>
      <Footer />
    </div>
  );
}
