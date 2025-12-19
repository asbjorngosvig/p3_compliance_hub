import type { InputHTMLAttributes } from "react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({
                                        value,
                                        onChange,
                                        placeholder = "Search...",
                                        className = "",
                                        ...props
                                    }: SearchInputProps) {
    return (
        <div className={`relative ${className}`}>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2 pr-10 text-sm placeholder:text-slate-400 outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-200"
                {...props}
            />
            <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400"
                aria-label="Search"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    className="h-4 w-4"
                >
                    <circle cx="11" cy="11" r="6" />
                    <line x1="16" y1="16" x2="20" y2="20" />
                </svg>
            </button>
        </div>
    );
}