import React, { useMemo, useState, useEffect } from "react";
import { ArrowsUpDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useConfirm } from "../../shared/components/ConfirmDialog.tsx";
import { Button } from "../../shared/components/Buttons.tsx";
import { dpaService } from "../../shared/services/dpaService.ts";
import type { IDPA, DpaRow, DpaStatus, DpaPriority } from "../../shared/types/dpa.types.ts";
import { useNavigate } from "react-router-dom";
import { OverviewHeader } from "../dashboard/OverviewHeader.tsx";

type SortKey = "name" | "status" | "priority" | "action" | "timeframe";

const USE_MOCK = true;

const buildMockDpas = (): IDPA[] => [
  {
    id: "mock-1",
    customerName: "Mock University",
    productName: "Mock Exam Platform",
    createdDate: new Date().toISOString(),
    fileUrl: "https://example.com/mock-dpa.pdf",
    violations: [
      {
        id: "v-1",
        description: "Retention exceeds contractual limit.",
        actions: [
          { id: "a-1", description: "You need written approval from Aarhus University (dpo@au.dk) before changing data processor" },
          { id: "a-2", description: "Request updated retention policy in writing." },
        ],
      },
    ],
  },
  {
    id: "mock-2",
    customerName: "Mock Municipality",
    productName: "Mock HR System",
    createdDate: new Date().toISOString(),
    fileUrl: "https://example.com/mock-dpa-2.pdf",
    violations: [],
  },
  {
    id: "mock-3",
    customerName: "Mock Hospital",
    productName: "Mock Patient Portal",
    createdDate: new Date().toISOString(),
    fileUrl: "https://example.com/mock-dpa-3.pdf",
    violations: [
      {
        id: "v-2",
        description: "Sub-processor list missing providers.",
        actions: [{ id: "a-3", description: "You need to notify legal@au.dk 30 days before switching data processor" }],
      },
      {
        id: "v-3",
        description: "Logging policy misalignment.",
        actions: [
          { id: "a-4", description: "Align logging configuration with policy." },
          { id: "a-5", description: "Document the logging changes." },
          { id: "a-6", description: "Schedule follow-up review." },
        ],
      },
    ],
  },
];

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

const simplifyActionText = (description: string): string => {
    const actionDescription = description.toLowerCase();

    if (actionDescription.includes("written approval")) {
        return "Get written approval";
    } 
    
    if (actionDescription.includes("notify") || actionDescription.includes("email")) {
        return "Contact";
    }

    return "Action required";
}

// Helper function to convert backend DPA to frontend DpaRow
const mapDPAtoDpaRow = (dpa: IDPA): DpaRow => {
  const violations = dpa.violations ?? [];

// Collect short action labels across all violations
const actionLabels = violations
  .flatMap((v) => v.actions ?? [])
  .map((a) => simplifyActionText(a.description));

// Deduplicate
const uniqueActions = Array.from(new Set(actionLabels));

let actionText = "None";
if (uniqueActions.length === 1) {
  actionText = uniqueActions[0];
} else if (uniqueActions.length > 1) {
  actionText = uniqueActions[0] + (" + " + (uniqueActions.length - 1));
}

  // Status/priority/timeframe without severity/requirements
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

  const confirm = useConfirm();
  const navigate = useNavigate();

  // Fetch DPAs from backend (or mock)
  useEffect(() => {
    const fetchDPAs = async () => {
      try {
        setLoading(true);
        setError(null);

        if (USE_MOCK) {
          const mock = buildMockDpas();
          const mapped = mock.map(mapDPAtoDpaRow);
          setDpas(mapped);
          return;
        }

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

  const handleDelete = async (id: string) => {
    const dpa = dpas.find((d) => d.id === id);
    if (!dpa) return;

    const ok = await confirm({
      title: "Delete DPA",
      message: `Are you sure you want to delete "${dpa.name}"? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      type: "danger",
    });

    if (!ok) return;

    // Mock delete: just remove locally
    if (USE_MOCK) {
      setDpas((prev) => prev.filter((d) => d.id !== id));
      return;
    }

    try {
      await dpaService.delete(id);
      setDpas((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error("Failed to delete DPA:", err);
      setError("Failed to delete DPA. Please try again.");
    }
  };

  const showingCount = filteredAndSortedDpas.length;

  const totalDpas = dpas.length;
  const violationsCount = dpas.filter((d) => d.status === "Violation").length;
  const compliantCount = dpas.filter((d) => d.status === "Compliant").length;
  const toBeContactedCount = dpas.filter((d) => d.action !== "None").length;

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

            <div className="relative flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search in DPAs"
                className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2 pr-10 text-sm placeholder:text-slate-400 outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-200"
              />
              <button className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  className="h-4 w-4"
                >
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
              {USE_MOCK && <span className="ml-2 text-xs text-amber-600">Mock mode</span>}
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
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Sort DPAs
                </p>

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
                          direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
                        }))
                      }
                      className={`flex w-full items-center justify-between rounded-xl px-2 py-1.5 text-sm ${
                        sort.key === key ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"
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
                    <tr
                      key={dpa.id}
                      className="hover:bg-slate-50 cursor-pointer"
                      onClick={() => navigate(`/dpas/${dpa.id}`)}
                    >
                      <td className="px-4 py-3 font-medium text-slate-800">{dpa.name}</td>

                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${statusBadgeClasses[dpa.status]}`}
                        >
                          <span className="h-2 w-2 rounded-full bg-current" />
                          {dpa.status}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${timeframeBadgeClasses(
                            dpa.timeframe
                          )}`}
                        >
                          {dpa.timeframe}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-slate-700">{dpa.priority}</td>

                      <td className="px-4 py-3 text-slate-700">
                        <span className="line-clamp-2 block">{dpa.action}</span>
                      </td>

                      <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="neutral"
                          className="flex items-center gap-1 text-xs"
                          onClick={() => handleDelete(dpa.id)}
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
};

export default DpaOverview;
