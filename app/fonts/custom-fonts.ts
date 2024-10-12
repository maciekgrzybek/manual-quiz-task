import localFont from 'next/font/local';

export const ttNorms = localFont({
  src: [
    {
      path: './TTNormsBold.woff',
      weight: '700',
    },
    {
      path: './TTNormsMedium.woff',
      weight: '400',
    },
    {
      path: './TTNormsRegular.woff',
      weight: '300',
    },
  ],
  variable: '--font-ttnorms',
});
