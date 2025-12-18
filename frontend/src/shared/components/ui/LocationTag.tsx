interface LocationTagProps {
    location: string;
    onRemove?: () => void;
    showDot?: boolean;
}

export default function LocationTag({
                                        location,
                                        onRemove,
                                        showDot = false
                                    }: LocationTagProps) {
    const baseClasses = onRemove
        ? "cursor-pointer hover:bg-slate-200 hover:line-through transition"
        : "";

    return (
        <span
            onClick={onRemove}
            className={`inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700 ${baseClasses}`}
        >
            {showDot && <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500" />}
            {location}
        </span>
    );
}