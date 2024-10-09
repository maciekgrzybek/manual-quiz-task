import type { Metadata } from 'next';

import './globals.css';
import { ttNorms } from './fonts/custom-fonts';

// TODO: Move that in more relevant place
export const metadata: Metadata = {
  title: 'Manual Landing Page Test',
  description: 'Manual Landing Page Test',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ttNorms.variable} antialiased`}>{children}</body>
    </html>
  );
}
