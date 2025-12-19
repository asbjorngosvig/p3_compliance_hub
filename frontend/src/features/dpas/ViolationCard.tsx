interface ViolationCardProps {
    index: number;
    description?: string;
}

export default function ViolationCard({ index, description }: ViolationCardProps) {
    return (
        <article className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex items-start gap-3">
                <span className="text-sm font-semibold text-gray-900">
                    Violation {index}
                </span>
            </div>
            {description && (
                <p className="mt-2 text-sm text-gray-700">
                    {description}
                </p>
            )}
        </article>
    );
}