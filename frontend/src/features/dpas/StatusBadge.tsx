import type { DpaStatus} from "../../shared/types/dpa.types.ts";

interface StatusBadgeProps {
    status: DpaStatus;
    showDot?: boolean;
}

const statusClasses: Record<DpaStatus, string> = {
    Compliant: "bg-emerald-100 text-emerald-700",
    Violation: "bg-red-100 text-red-700",
    Pending: "bg-amber-100 text-amber-700",
};

export default function StatusBadge({ status, showDot = true }: StatusBadgeProps) {
    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${statusClasses[status]}`}
        >
            {showDot && <span className="h-2 w-2 rounded-full bg-current" />}
            {status}
        </span>
    );
}