interface TimeframeBadgeProps {
    timeframe: string;
}

const getTimeframeClasses = (timeframe: string): string => {
    if (timeframe === "None") return "bg-emerald-100 text-emerald-700";
    if (timeframe.toLowerCase() === "asap") return "bg-red-100 text-red-700";
    return "bg-amber-100 text-amber-700";
};

export default function TimeframeBadge({ timeframe }: TimeframeBadgeProps) {
    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getTimeframeClasses(timeframe)}`}
        >
            {timeframe}
        </span>
    );
}