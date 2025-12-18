import { TrashIcon } from "@heroicons/react/24/outline";
import { Button} from "../../shared/components/ui/Buttons.tsx";
import { dpaService } from "../../shared/services/dpaService.ts";
import type { IDPA, DpaRow, DpaStatus, DpaPriority } from "../../shared/types/dpa.types.ts";
import { useNavigate } from "react-router-dom";
import { OverviewHeader } from "../dashboard/OverviewHeader.tsx";
import { useDataFetching } from "../../shared/hooks/useDataFetching";
import { useSearchAndSort } from "../../shared/hooks/useSearchAndSort";
import { useDeleteWithConfirm} from "../../shared/hooks/useDeletewithConfirm.ts";
import SearchInput from "../../shared/components/form/SearchInput.tsx";
import ErrorMessage from "../../shared/components/ui/ErrorMessage.tsx";
import LoadingState from "../../shared/components/ui/LoadingState.tsx";
import EmptyState from "../../shared/components/ui/EmptyState.tsx";
import SortDropdown from "../../shared/components/ui/SortDropDown.tsx";
import StatusBadge from "./StatusBadge.tsx";
import TimeframeBadge from "./TimeFrameBadge.tsx";

type SortKey = "name" | "status" | "priority" | "action" | "timeframe";

const simplifyActionText = (description: string): string => {
    const d = description.toLowerCase();

    if (d.includes("written approval")) return "Get written approval";
    if (d.includes("notify") || d.includes("email")) return "Contact";

    return "Action required";
};

// Helper function to convert backend DPA to frontend DpaRow
const mapDPAtoDpaRow = (dpa: IDPA): DpaRow => {
    const violations = dpa.violations ?? [];

    const actionLabels = violations
        .flatMap((v) => v.actions ?? [])
        .map((a) => simplifyActionText(a.description));

    const uniqueActions = Array.from(new Set(actionLabels));

    let actionText = "None";
    if (uniqueActions.length === 1) {
        actionText = uniqueActions[0];
    } else if (uniqueActions.length > 1) {
        actionText = `${uniqueActions[0]} +${uniqueActions.length - 1}`;
    }

    let status: DpaStatus = "Compliant";
    let priority: DpaPriority = "None";
    let timeframe = "None";

    if (violations.length > 0) {
        status = "Violation";
        priority = "Important";
        timeframe = uniqueActions.length > 0 ? "ASAP" : "None";
    }

    return {
        id: dpa.id,
        name: dpa.customerName,
        status,
        priority,
        action: actionText,
        timeframe,
    };
};

export default function DpaOverview() {
    const navigate = useNavigate();

    // Fetch DPAs from backend
    const { data: dpasData, loading, error, refetch } = useDataFetching({
        fetchFn: async () => {
            const response = await dpaService.getAll();
            return response.dpas.map(mapDPAtoDpaRow);
        }
    });

    const dpas = dpasData || [];

    // Search and sort functionality
    const {
        searchTerm,
        setSearchTerm,
        sortState,
        setSortState,
        processedData: filteredAndSortedDpas,
    } = useSearchAndSort<DpaRow, SortKey>({
        data: dpas,
        searchKeys: ['name'],
        initialSortKey: 'name'
    });

    // Delete functionality
    const { handleDelete } = useDeleteWithConfirm({
        onDelete: async (id) => await dpaService.delete(id),
        getItemName: (dpa: DpaRow) => dpa.name,
        onSuccess: refetch
    });

    const showingCount = filteredAndSortedDpas.length;
    const totalDpas = dpas.length;
    const violationsCount = dpas.filter((d) => d.status === "Violation").length;
    const compliantCount = dpas.filter((d) => d.status === "Compliant").length;
    const toBeContactedCount = dpas.filter((d) => d.action !== "None").length;

    const sortOptions = [
        { key: "name" as const, label: "Name" },
        { key: "status" as const, label: "Status" },
        { key: "timeframe" as const, label: "Timeframe" },
        { key: "priority" as const, label: "Priority" },
        { key: "action" as const, label: "Action" },
    ];

    return (
        <div className="space-y-6">
            <OverviewHeader
                totalDpas={totalDpas}
                violationsCount={violationsCount}
                compliantCount={compliantCount}
                toBeContactedCount={toBeContactedCount}
            />

            <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm lg:p-6">
                {/* Header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-1 items-center gap-4">
                        <h2 className="text-2xl font-semibold tracking-tight">DPAs</h2>

                        <SearchInput
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search in DPAs"
                            className="flex-1"
                        />
                    </div>

                    {/* Sort dropdown */}
                    <div className="relative flex items-center gap-3">
                        <span className="text-sm text-slate-500">
                            <span className="font-medium text-slate-700">Showing:</span>{" "}
                            {showingCount}
                        </span>

                        <SortDropdown
                            options={sortOptions}
                            currentSort={sortState}
                            onSortChange={setSortState}
                            defaultSort={{ key: "name", direction: "asc" }}
                        />
                    </div>
                </div>

                {/* Error Message */}
                {error && <ErrorMessage message={error} className="mt-4" />}

                {/* TABLE */}
                <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
                    <div className="max-h-[48vh] overflow-y-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                                    Name
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                                    Timeframe
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                                    Priority
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                                    Action
                                </th>
                                <th className="w-20 px-4 py-3"></th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100 bg-white text-sm">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-10 text-center">
                                        <LoadingState message="Loading DPAs..." />
                                    </td>
                                </tr>
                            ) : filteredAndSortedDpas.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-10 text-center">
                                        <EmptyState
                                            title={
                                                searchTerm.trim()
                                                    ? "No DPAs match your search."
                                                    : "No DPAs found. Create one to get started."
                                            }
                                        />
                                    </td>
                                </tr>
                            ) : (
                                filteredAndSortedDpas.map((dpa) => (
                                    <tr
                                        key={dpa.id}
                                        className="hover:bg-slate-50 cursor-pointer"
                                        onClick={() => navigate(`/dpas/${dpa.id}`)}
                                    >
                                        <td className="px-4 py-3 font-medium text-slate-800">
                                            {dpa.name}
                                        </td>

                                        <td className="px-4 py-3">
                                            <StatusBadge status={dpa.status} />
                                        </td>

                                        <td className="px-4 py-3">
                                            <TimeframeBadge timeframe={dpa.timeframe} />
                                        </td>

                                        <td className="px-4 py-3 text-slate-700">
                                            {dpa.priority}
                                        </td>

                                        <td className="px-4 py-3 text-slate-700">
                                            <span className="line-clamp-2 block">{dpa.action}</span>
                                        </td>

                                        <td
                                            className="px-4 py-3 text-right"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Button
                                                variant="neutral"
                                                className="flex items-center gap-1 text-xs"
                                                onClick={() => handleDelete(dpa, dpa.id)}
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}