import SeverityBadge from "./SeverityBadge.tsx";

interface ViolationCardProps {
    index: number;
    severity?: string;
    description: string;
}

export default function ViolationCard({
                                          index,
                                          severity,
                                          description,
                                      }: ViolationCardProps) {
    return (
        <div className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            {/* Index */}
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
                {index}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-800">
                        Violation
                    </span>
                    {severity && <SeverityBadge severity={severity} />}
                </div>

                <p className="text-sm text-slate-600">
                    {description}
                </p>
            </div>
        </div>
    );
}
