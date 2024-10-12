import Link from 'next/link';
import Image from 'next/image';
import { Text } from '@/design-system/text/text';
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from '@/design-system/icons/social-media';

// TODO: Move to a hook or something
const menuItems = [
  {
    title: 'PRODUCT',
    items: [
      { label: 'Popular', href: '#' },
      { label: 'Trending', href: '#' },
      { label: 'Guided', href: '#' },
      { label: 'Products', href: '#' },
    ],
  },
  {
    title: 'COMPANY',
    items: [
      { label: 'Press', href: '#' },
      { label: 'Mission', href: '#' },
      { label: 'Strategy', href: '#' },
      { label: 'About', href: '#' },
    ],
  },
  {
    title: 'INFO',
    items: [
      { label: 'Support', href: '#' },
      { label: 'Customer Service', href: '#' },
      { label: 'Get Started', href: '#' },
    ],
  },
];

const socialMediaLinks = [
  { name: 'Facebook', href: '#', Icon: FacebookIcon },
  { name: 'Instagram', href: '#', Icon: InstagramIcon },
  { name: 'Twitter', href: '#', Icon: TwitterIcon },
];

export default function Footer() {
  return (
    <footer className="bg-brand-primary-200 ">
      <div className="container mx-auto px-4 md:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 py-14 md:py-16 lg:py-[72px]">
          <div className="md:col-span-2 mb-6 md:mb-0">
            <Image src="/images/logo.svg" width={50} height={50} alt="Logo" />
          </div>
          {menuItems.map((section) => (
            <div key={section.title}>
              <Text variant="h6" className="text-brand-primary-600 mb-4">
                {section.title}
              </Text>
              <ul className="text-brand-primary-600 gap-3 flex flex-col">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Text variant="body">
                      <Link href={item.href}>{item.label}</Link>
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <Text variant="h6" className="text-brand-primary-600 mb-4">
              FOLLOW US
            </Text>
            <div className="flex space-x-4">
              {socialMediaLinks.map(({ name, href, Icon }) => (
                <Link
                  key={name}
                  href={href}
                  className="text-brand-secondary-600 hover:text-brand-secondary-700"
                >
                  <span className="sr-only">{name}</span>
                  <Icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="py-8 border-t border-brand-primary-300 text-center">
          <Text variant="body" className="text-brand-primary-500">
            &copy; 2021 Manual. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
}
