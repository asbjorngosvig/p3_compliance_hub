interface SeverityBadgeProps {
    severity?: string;
    className?: string;
}

const getSeverityClasses = (severity?: string): string => {
    if (!severity) return "bg-slate-100 text-slate-700";

    const s = severity.toLowerCase();
    if (s === "high" || s === "critical") return "bg-red-100 text-red-700";
    if (s === "medium") return "bg-amber-100 text-amber-700";
    if (s === "low") return "bg-emerald-100 text-emerald-700";

    return "bg-slate-100 text-slate-700";
};

export default function SeverityBadge({ severity, className = "" }: SeverityBadgeProps) {
    if (!severity) return null;

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getSeverityClasses(severity)} ${className}`}
        >
            {severity}
        </span>
    );
}