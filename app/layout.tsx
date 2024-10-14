import type { Metadata } from 'next';

import './globals.css';
import { ttNorms } from './fonts/custom-fonts';

// Metadata should probably live in a separate folder/module, but for now we can keep it here.
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
