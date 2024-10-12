import { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

export const fontSize: ResolvableTo<
  KeyValuePair<string, [fontSize: string, lineHeight: string]>
> = {
  xs: ['0.625rem', '0.75rem'],
  '3xl': ['1.75rem', '2.5rem'],
  '5xl': ['2.5rem', '3.75rem'],
  '8xl': ['5.625rem', '1'],
};
