import {useNavigate} from "react-router-dom";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "tertiary"| "danger" | "neutral";
    to?: string;
};

export function Button({
                           variant = "primary",
                           to,
                           className = "",
                           children,
                           ...props
                       }: ButtonProps) {
    const navigate = useNavigate();

    const baseStyles =
        "px-4 py-2 rounded-md font-medium transition-transform duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 hover:-translate-y-0.5 active:translate-y-0";

    const variantStyles = {
        primary:
            "bg-[#88AA30] text-white hover:bg-[#BAD377] focus:ring-gray-700 disabled:bg-gray-400",
        secondary:
            "bg-[#D4DFE6] text-[#2A5D84] hover:bg-[#CAE5F7] focus:ring-blue-700 disabled:bg-blue-300",
        tertiary:
            "border-2 border-[#D4DFE6] text-[#414141] hover:bg-[#D4DFE6] focus:ring-blue-700 disabled:bg-blue-300",
        neutral:
            "text-gray-600 hover:text-gray-800 px-2 py-1",
        danger:
            "text-red-600 hover:text-red-800 px-2 py-1"
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
