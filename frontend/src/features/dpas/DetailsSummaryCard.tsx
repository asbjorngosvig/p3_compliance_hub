interface SummaryItem {
    label: string;
    value: string | number;
}

interface DetailsSummaryCardProps {
    title?: string;
    items: SummaryItem[];
    className?: string;
}

export default function DetailsSummaryCard({
                                               title = "Summary",
                                               items,
                                               className = ""
                                           }: DetailsSummaryCardProps) {
    return (
        <div className={`rounded-2xl bg-white p-4 shadow-sm h-fit ${className}`}>
            <h2 className="mb-3 text-sm font-semibold text-slate-800">
                {title}
            </h2>
            <dl className="space-y-2 text-sm">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between gap-3">
                        <dt className="text-slate-500">{item.label}</dt>
                        <dd className="text-right font-medium text-slate-800">
                            {item.value}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}