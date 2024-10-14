import React from 'react';

type Variant = 'primary' | 'secondary';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: Variant;
}

export const Button = ({
  children,
  variant = 'primary',
  className,
  ...rest
}: Props) => {
  const baseClasses = [
    'flex',
    'flex-row',
    'px-[30px]',
    'py-[15px]',
    'font-bold',
    'text-xs',
    'transition-opacity',
    'duration-300',
    'uppercase',
  ];

  const variantClasses = {
    primary: ['bg-brand-secondary-600', 'text-white'],
    secondary: ['border', 'border-natural-100', 'text-natural-300'],
  };

  const stateClasses = rest.disabled
    ? ['opacity-50', 'cursor-not-allowed']
    : ['hover:opacity-90', 'cursor-pointer'];

  const buttonClasses = [
    ...baseClasses,
    ...stateClasses,
    ...variantClasses[variant],
    className,
  ].join(' ');

  return (
    <button className={buttonClasses} {...rest}>
      {children}
    </button>
  );
};
