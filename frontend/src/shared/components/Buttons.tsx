import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'black' | 'blue';
};

export function Button({
  variant = 'black',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'px-4 py-2 rounded-md font-medium transition-transform duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 hover:-translate-y-0.5 active:translate-y-0';

  const variantStyles = {
    black:
      'bg-black text-white hover:bg-gray-700 focus:ring-gray-700 disabled:bg-gray-400',
    blue:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-700 disabled:bg-blue-300',
  }[variant];

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
