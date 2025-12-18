interface LoadingStateProps {
    message?: string;
    size?: "sm" | "md" | "lg";
}

const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-6 w-6"
};

export default function LoadingState({
                                         message = "Loading...",
                                         size = "md"
                                     }: LoadingStateProps) {
    return (
        <div className="flex items-center justify-center gap-2">
            <div
                className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-slate-300 border-t-slate-600`}
            />
            <span className="text-sm text-slate-400">{message}</span>
        </div>
    );
}