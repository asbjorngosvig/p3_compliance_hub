interface EmptyStateProps {
    title: string;
    description?: string;
    variant?: "default" | "dashed";
}

export default function EmptyState({
                                       title,
                                       description,
                                       variant = "default"
                                   }: EmptyStateProps) {
    const containerClasses = variant === "dashed"
        ? "mt-6 rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-center"
        : "px-4 py-10 text-center text-sm text-slate-400";

    return (
        <div className={containerClasses}>
            <p className={variant === "dashed" ? "text-sm font-medium text-gray-700" : ""}>
                {title}
            </p>
            {description && (
                <p className={variant === "dashed" ? "mt-1 text-xs text-gray-500" : "mt-1 text-xs"}>
                    {description}
                </p>
            )}
        </div>
    );
}