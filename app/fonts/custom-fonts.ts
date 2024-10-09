import localFont from 'next/font/local';

export const ttNorms = localFont({
  src: [
    {
      path: './TTNormsBold.woff',
      weight: '700',
    },
    {
      path: './TTNormsRegular.woff',
      weight: '400',
    },
  ],
  variable: '--font-ttnorms',
});
