import React, { useMemo, useState } from "react";

type DpaStatus = "Compliant" | "Violation" | "Pending";
type DpaPriority = "None" | "Urgent" | "Important";
type DpaAction = "None" | "Terminate" | "Contact";

interface DpaRow {
    id: number;
    name: string;
    status: DpaStatus;
    priority: DpaPriority;
    action: DpaAction;
    timeframe: string; // "None", "ASAP", "2 months", osv.
}

// Dummy data – 20 stk til at teste scroll
const initialDpas: DpaRow[] = [
    { id: 1,  name: "AAU",        status: "Compliant", priority: "None",      action: "None",      timeframe: "None" },
    { id: 2,  name: "DTU",        status: "Violation", priority: "Urgent",    action: "Terminate", timeframe: "ASAP" },
    { id: 3,  name: "ITU",        status: "Violation", priority: "Important", action: "Contact",   timeframe: "2 months" },
    { id: 4,  name: "KU",         status: "Compliant", priority: "None",      action: "None",      timeframe: "None" },
    { id: 5,  name: "AAI",        status: "Compliant", priority: "None",      action: "None",      timeframe: "None" },
    { id: 6,  name: "CBS",        status: "Compliant", priority: "None",      action: "None",      timeframe: "None" },
    { id: 7,  name: "SDU",        status: "Pending",   priority: "Important", action: "Contact",   timeframe: "1 month" },
    { id: 8,  name: "RUC",        status: "Violation", priority: "Urgent",    action: "Terminate", timeframe: "ASAP" },
    { id: 9,  name: "AU",         status: "Compliant", priority: "None",      action: "None",      timeframe: "None" },
    { id: 10, name: "VIA",        status: "Pending",   priority: "None",      action: "Contact",   timeframe: "3 months" },
    { id: 11, name: "UCN",        status: "Compliant", priority: "None",      action: "None",      timeframe: "None" },
    { id: 12, name: "Zealand",    status: "Violation", priority: "Urgent",    action: "Terminate", timeframe: "ASAP" },
    { id: 13, name: "BAA",        status: "Compliant", priority: "None",      action: "None",      timeframe: "None" },
    { id: 14, name: "EAAA",       status: "Pending",   priority: "Important", action: "Contact",   timeframe: "2 months" },
    { id: 15, name: "KEA",        status: "Violation", priority: "Important", action: "Contact",   timeframe: "1 month" },
    { id: 16, name: "CphBusiness",status: "Compliant", priority: "None",      action: "None",      timeframe: "None" },
    { id: 17, name: "PH Metropol",status: "Pending",   priority: "None",      action: "Contact",   timeframe: "30 days" },
    { id: 18, name: "Lund Univ.", status: "Compliant", priority: "None",      action: "None",      timeframe: "None" },
    { id: 19, name: "KTH",        status: "Violation", priority: "Urgent",    action: "Terminate", timeframe: "ASAP" },
    { id: 20, name: "Chalmers",   status: "Compliant", priority: "None",      action: "None",      timeframe: "None" },
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

const DpaOverview: React.FC = () => {
    const [search, setSearch] = useState("");
    const [dpas, setDpas] = useState<DpaRow[]>(initialDpas);

    const filteredDpas = useMemo(() => {
        if (!search.trim()) return dpas;
        const term = search.toLowerCase();
        return dpas.filter((dpa) => dpa.name.toLowerCase().includes(term));
    }, [search, dpas]);

    const handleDelete = (id: number) => {
        setDpas((prev) => prev.filter((dpa) => dpa.id !== id));
    };

    const handleEdit = (id: number) => {
        console.log("Edit DPA with id:", id);
    };

    const showingCount = filteredDpas.length;

    return (
        <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm lg:p-6">
            {/* Header med DPAs label, search i midten, showing + filter til højre */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Venstre: DPAs + searchfelt i samme række */}
                <div className="flex flex-1 items-center gap-4">
                    <h2 className="text-2xl font-semibold tracking-tight">DPAs</h2>

                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search in DPAs"
                            className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2 pr-10 text-sm
                         placeholder:text-slate-400
                         outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-200"
                        />
                        {/* Search-ikon */}
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400"
                        >
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

                {/* Højre: Showing + Filter */}
                <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">
            <span className="font-medium text-slate-700">Showing :</span>{" "}
              {showingCount}
          </span>

                    <button
                        type="button"
                        className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-200"
                    >
                        Filter
                    </button>
                </div>
            </div>

            {/* Scrollable table container */}
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
                <div className="max-h-[520px] overflow-y-auto">
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
                                Priority
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                                Action
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                                Timeframe
                            </th>
                            <th className="w-20 px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-slate-500">
                                {/* actions */}
                            </th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 bg-white text-sm">
                        {filteredDpas.map((dpa) => (
                            <tr key={dpa.id} className="hover:bg-slate-50">
                                <td className="px-4 py-3 font-medium text-slate-800">
                                    {dpa.name}
                                </td>

                                <td className="px-4 py-3">
                    <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${statusBadgeClasses[dpa.status]}`}
                    >
                      <span className="h-2 w-2 rounded-full bg-current" />
                        {dpa.status}
                    </span>
                                </td>

                                <td className="px-4 py-3 text-slate-700">{dpa.priority}</td>

                                <td className="px-4 py-3 text-slate-700">{dpa.action}</td>

                                <td className="px-4 py-3">
                    <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${timeframeBadgeClasses(
                            dpa.timeframe
                        )}`}
                    >
                      {dpa.timeframe}
                    </span>
                                </td>

                                <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(dpa.id)}
                                            className="rounded-full p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                            aria-label="Delete DPA"
                                        >
                                            {/* trash icon */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={1.8}
                                                className="h-4 w-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 3h6m-9 4h12M9 7v12m6-12v12M5 7l1 13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-13"
                                                />
                                            </svg>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleEdit(dpa.id)}
                                            className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                            aria-label="Edit DPA"
                                        >
                                            {/* pencil icon */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={1.8}
                                                className="h-4 w-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M16.5 3.5 20.5 7.5 8 20H4v-4L16.5 3.5z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {filteredDpas.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-4 py-10 text-center text-sm text-slate-400"
                                >
                                    No DPAs match your search.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default DpaOverview;
