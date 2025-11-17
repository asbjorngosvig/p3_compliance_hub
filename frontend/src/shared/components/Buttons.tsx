import { useNavigate } from "react-router-dom";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "green" | "blue";
  to?: string;
};

export function Button({
  variant = "green",
  to,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const navigate = useNavigate();

  const baseStyles =
    "px-4 py-2 rounded-md font-medium transition-transform duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 hover:-translate-y-0.5 active:translate-y-0";

  const variantStyles = {
    green:
      "bg-[#88AA30] text-white hover:bg-[#BAD377] focus:ring-gray-700 disabled:bg-gray-400",
    blue:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-700 disabled:bg-blue-300",
  }[variant];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (to) {
      e.preventDefault();
      navigate(to);
    }

    if (props.onClick) props.onClick(e);
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`.trim()}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
