import React from 'react';
import { Variant, textClasses } from './config';
import { TextVariant } from './text-variant';

interface Props {
  variant: Variant;
  children: React.ReactNode;
  // We could make this stricter if needed as we don't
  // want to allow to abuse the defined variants.
  className?: string;
}

export const Text = ({ variant, children, className = '' }: Props) => {
  const Component = TextVariant.from(variant).toComponent();
  const variantClass = textClasses[variant];

  return (
    <Component className={`${variantClass} ${className}`}>{children}</Component>
  );
};
