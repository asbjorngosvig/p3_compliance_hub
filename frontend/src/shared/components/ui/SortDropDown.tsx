import { useState } from "react";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";

interface SortOption<T extends string> {
    key: T;
    label: string;
}

interface SortDropdownProps<T extends string> {
    options: SortOption<T>[];
    currentSort: { key: T; direction: "asc" | "desc" };
    onSortChange: (sort: { key: T; direction: "asc" | "desc" }) => void;
    defaultSort?: { key: T; direction: "asc" | "desc" };
}

export default function SortDropdown<T extends string>({
                                                           options,
                                                           currentSort,
                                                           onSortChange,
                                                           defaultSort
                                                       }: SortDropdownProps<T>) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSortChange = (key: T) => {
        onSortChange({
            key,
            direction:
                currentSort.key === key && currentSort.direction === "asc"
                    ? "desc"
                    : "asc",
        });
    };

    const handleReset = () => {
        if (defaultSort) {
            onSortChange(defaultSort);
        }
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 border-2 border-[#D4DFE6] shadow-sm transition hover:bg-slate-50"
            >
                <ArrowsUpDownIcon className="h-5 w-5 text-slate-700" />
                <span>Sort</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 top-10 z-20 w-64 rounded-2xl bg-white p-3 shadow-xl border-2 border-[#D4DFE6]">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Sort Options
                    </p>

                    <div className="space-y-1">
                        {options.map(({ key, label }) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => handleSortChange(key)}
                                className={`flex w-full items-center justify-between rounded-xl px-2 py-1.5 text-sm ${
                                    currentSort.key === key
                                        ? "bg-slate-100 text-slate-900"
                                        : "text-slate-600 hover:bg-slate-50"
                                }`}
                            >
                                <span>{label}</span>
                                <span className="text-[10px] uppercase tracking-wide">
                                    {currentSort.key === key
                                        ? currentSort.direction === "asc"
                                            ? "A → Z"
                                            : "Z → A"
                                        : ""}
                                </span>
                            </button>
                        ))}
                    </div>

                    {defaultSort && (
                        <button
                            type="button"
                            className="mt-3 w-full rounded-xl bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 border border-[#D4DFE6] hover:bg-slate-100"
                            onClick={handleReset}
                        >
                            Reset to {options.find(o => o.key === defaultSort.key)?.label} (A → Z)
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}