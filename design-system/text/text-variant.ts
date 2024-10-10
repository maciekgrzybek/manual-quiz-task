import { Variant } from './config';

// Creating a class to represent a text variant
// so we can add methods to it later if we want.
// This is to avoid the primitive obsession anti-pattern.
export class TextVariant {
  constructor(private readonly variant: Variant) {}

  public static from(variant: Variant) {
    return new TextVariant(variant);
  }

  public toComponent() {
    return this.variant.startsWith('h') ? this.variant : 'p';
  }
}
