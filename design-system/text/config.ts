export type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'caption';

export const textClasses: Record<Variant, string> = {
  h1: 'text-6xl lg:text-8xl font-bold',
  h2: 'text-5xl font-bold',
  h3: 'text-4xl font-semibold',
  h4: 'text-3xl font-semibold',
  h5: 'text-lg font-semibold',
  h6: 'text-xs font-bold tracking-[0.15em]',
  body: 'text-base font-normal',
  caption: 'text-sm font-normal',
};
