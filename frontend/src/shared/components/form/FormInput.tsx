import type {InputHTMLAttributes} from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    required?: boolean;
}

export default function FormInput({
                                      label,
                                      error,
                                      required = false,
                                      className = "",
                                      ...props
                                  }: FormInputProps) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={props.id} className="text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                {...props}
                className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${className}`}
            />
            {error && (
                <p className="text-xs text-red-600">{error}</p>
            )}
        </div>
    );
}