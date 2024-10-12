import { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

export const fontSize: ResolvableTo<
  KeyValuePair<string, [fontSize: string, lineHeight: string]>
> = {
  xs: ['0.625rem', '0.75rem'] as const, // 10px, 12px
  '8xl': ['5.625rem', '1'] as const, // 90px, 90px
};
