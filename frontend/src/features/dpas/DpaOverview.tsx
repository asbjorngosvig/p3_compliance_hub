import React, { useMemo, useState, useEffect } from "react";
import {ArrowsUpDownIcon, TrashIcon} from "@heroicons/react/24/outline";
import {useConfirm} from "../../shared/components/ConfirmDialog.tsx";
import {Button} from "../../shared/components/Buttons.tsx";
import { dpaService} from "../../shared/services/dpaService.ts";
import type { IDPA, DpaRow, DpaStatus, DpaPriority, DpaAction} from "../../shared/types/dpa.types.ts";

type SortKey = "name" | "status" | "priority" | "action" | "timeframe";

const statusBadgeClasses: Record<DpaStatus, string> = {
    Compliant: "bg-emerald-100 text-emerald-700",
    Violation: "bg-red-100 text-red-700",
    Pending: "bg-amber-100 text-amber-700",
};

const timeframeBadgeClasses = (timeframe: string) => {
    if (timeframe === "None") return "bg-emerald-100 text-emerald-700";
    if (timeframe.toLowerCase() === "asap") return "bg-red-100 text-red-700";
    return "bg-amber-100 text-amber-700";
};

// Helper function to convert backend DPA to frontend DpaRow
const mapDPAtoDpaRow = (dpa: IDPA): DpaRow => {
    // Determine status based on violations
    let status: DpaStatus = "Compliant";
    let priority: DpaPriority = "None";
    let action: DpaAction = "None";
    let timeframe = "None";

    if (dpa.violations && dpa.violations.length > 0) {
        status = "Violation";

        // Check severity to determine priority
        const hasHighSeverity = dpa.violations.some(v =>
            v.severity?.toLowerCase() === "high" || v.severity?.toLowerCase() === "critical"
        );

        if (hasHighSeverity) {
            priority = "Urgent";
            action = "Terminate";
            timeframe = "ASAP";
        } else {
            priority = "Important";
            action = "Contact";
            timeframe = "1 month";
        }
    } else if (dpa.requirements && dpa.requirements.length > 0) {
        // If has requirements but no violations, might be pending evaluation
        status = "Pending";
        priority = "Important";
        action = "Contact";
        timeframe = "2 months";
    }

    return {
        id: dpa.id,
        name: dpa.customerName,
        status,
        priority,
        action,
        timeframe,
    };
};

const DpaOverview: React.FC = () => {
    const [search, setSearch] = useState("");
    const [dpas, setDpas] = useState<DpaRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [sort, setSort] = useState<{ key: SortKey; direction: "asc" | "desc" }>({
        key: "name",
        direction: "asc",
    });

    // Fetch DPAs from backend
    useEffect(() => {
        const fetchDPAs = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await dpaService.getAll();
                const mappedDpas = response.dpas.map(mapDPAtoDpaRow);
                setDpas(mappedDpas);
            } catch (err) {
                console.error("Failed to fetch DPAs:", err);
                setError("Failed to load DPAs. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchDPAs();
    }, []);

    const filteredAndSortedDpas = useMemo(() => {
        let result = dpas;

        if (search.trim()) {
            const term = search.toLowerCase();
            result = result.filter((dpa) => dpa.name.toLowerCase().includes(term));
        }

        const sorted = [...result].sort((a, b) => {
            const key = sort.key;
            const aVal = String(a[key] ?? "");
            const bVal = String(b[key] ?? "");
            const cmp = aVal.localeCompare(bVal, "en", { sensitivity: "base" });
            return sort.direction === "asc" ? cmp : -cmp;
        });

        return sorted;
    }, [dpas, search, sort]);

    const confirm = useConfirm();

    const handleDelete = async (id: string) => {
        const dpa = dpas.find((d) => d.id === id);
        if (!dpa) return;

        const ok = await confirm({
            title: "Delete DPA",
            message: `Are you sure you want to delete "${dpa.name}"? This action cannot be undone.`,
            confirmText: "Delete",
            cancelText: "Cancel",
        });

        if (!ok) return;

        try {
            await dpaService.delete(id);
            setDpas((prev) => prev.filter((d) => d.id !== id));
        } catch (err) {
            console.error("Failed to delete DPA:", err);
            setError("Failed to delete DPA. Please try again.");
        }
    };

    const handleEdit = (id: string) => {
        console.log("Edit DPA with id:", id);
        // TODO: Implement edit functionality
    };

    const showingCount = filteredAndSortedDpas.length;

    return (
        <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm lg:p-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 items-center gap-4">
                    <h2 className="text-2xl font-semibold tracking-tight">DPAs</h2>

                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search in DPAs"
                            className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2 pr-10 text-sm placeholder:text-slate-400 outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-200"
                        />
                        <button className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                                <circle cx="11" cy="11" r="6" />
                                <line x1="16" y1="16" x2="20" y2="20" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Sort button */}
                <div className="relative flex items-center gap-3">
                    <span className="text-sm text-slate-500">
                        <span className="font-medium text-slate-700">Showing :</span> {showingCount}
                    </span>

                    <button
                        type="button"
                        onClick={() => setIsFilterOpen((prev) => !prev)}
                        className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 border-2 border-[#D4DFE6] shadow-sm transition hover:bg-slate-50"
                    >
                        <ArrowsUpDownIcon className="h-5 w-5 text-slate-700" />
                        <span>Sort</span>
                    </button>

                    {isFilterOpen && (
                        <div className="absolute right-0 top-10 z-20 w-64 rounded-2xl bg-white p-3 shadow-xl border-2 border-[#D4DFE6]">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Sort DPAs</p>

                            <div className="space-y-1">
                                {(
                                    [
                                        ["name", "Name"],
                                        ["status", "Status"],
                                        ["timeframe", "Timeframe"],
                                        ["priority", "Priority"],
                                        ["action", "Action"],
                                    ] as [SortKey, string][]
                                ).map(([key, label]) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() =>
                                            setSort((prev) => ({
                                                key,
                                                direction:
                                                    prev.key === key && prev.direction === "asc"
                                                        ? "desc"
                                                        : "asc",
                                            }))
                                        }
                                        className={`flex w-full items-center justify-between rounded-xl px-2 py-1.5 text-sm ${
                                            sort.key === key
                                                ? "bg-slate-100 text-slate-900"
                                                : "text-slate-600 hover:bg-slate-50"
                                        }`}
                                    >
                                        <span>{label}</span>
                                        <span className="text-[10px] uppercase tracking-wide">
                                            {sort.key === key ? (sort.direction === "asc" ? "A → Z" : "Z → A") : ""}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                className="mt-3 w-full rounded-xl bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 border border-[#D4DFE6] hover:bg-slate-100"
                                onClick={() => setSort({ key: "name", direction: "asc" })}
                            >
                                Reset to Name (A → Z)
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* TABLE */}
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
                <div className="max-h-[48vh] overflow-y-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Timeframe</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Priority</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Action</th>
                            <th className="w-20 px-4 py-3"></th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 bg-white text-sm">
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-400">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600"></div>
                                        <span>Loading DPAs...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : filteredAndSortedDpas.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-400">
                                    {search.trim() ? "No DPAs match your search." : "No DPAs found. Create one to get started."}
                                </td>
                            </tr>
                        ) : (
                            filteredAndSortedDpas.map((dpa) => (
                                <tr key={dpa.id} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-slate-800">{dpa.name}</td>

                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${statusBadgeClasses[dpa.status]}`}>
                                            <span className="h-2 w-2 rounded-full bg-current" />
                                            {dpa.status}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3">
                                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${timeframeBadgeClasses(dpa.timeframe)}`}>
                                            {dpa.timeframe}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3 text-slate-700">{dpa.priority}</td>

                                    <td className="px-4 py-3 text-slate-700">{dpa.action}</td>

                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => handleEdit(dpa.id)}
                                                className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                                                    <path d="M16.5 3.5 20.5 7.5 8 20H4v-4L16.5 3.5z" />
                                                </svg>
                                            </button>
                                            <Button
                                                variant="neutral"
                                                className="flex items-center gap-1 text-xs"
                                                onClick={() => handleDelete(dpa.id)}
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default DpaOverview;