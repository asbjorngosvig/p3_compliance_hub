// src/features/dpas/DpaDetails.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { dpaService } from "../../shared/services/dpaService.ts";
import type {
    IDPA,
    IViolation,
    IRequirement,
    ICommunicationStrategy,
} from "../../shared/types/dpa.types.ts";

const DpaDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [dpa, setDpa] = useState<IDPA | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError("Missing DPA id");
            setLoading(false);
            return;
        }

        const fetchDpa = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await dpaService.getById(id);
                setDpa(data);
            } catch (e) {
                console.error("Failed to fetch DPA:", e);
                setError("Failed to load DPA. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchDpa();
    }, [id]);

    if (loading) {
        return (
            <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Loading DPA…</p>
            </section>
        );
    }

    if (error || !dpa) {
        return (
            <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                        <ArrowLeftIcon className="mr-1 h-4 w-4" />
                        Back
                    </button>
                </div>
                <p className="text-sm text-red-600">{error ?? "DPA not found."}</p>
            </section>
        );
    }

    const created = dpa.createdDate ? new Date(dpa.createdDate) : null;

    return (
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
            {/* Top bar */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {dpa.customerName || "DPA"} – {dpa.productName}
                    </h1>
                    {created && (
                        <p className="mt-1 text-xs text-slate-500">
                            Created{" "}
                            {created.toLocaleDateString()}{" "}
                            {created.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                    )}
                </div>

                <div className="flex gap-2">
                    {dpa.fileUrl && (
                        <a
                            href={dpa.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-[#2A5D83] hover:bg-slate-100"
                        >
                            Open DPA file
                        </a>
                    )}
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                        <ArrowLeftIcon className="mr-1 h-4 w-4" />
                        Back
                    </button>
                </div>
            </div>

            {/* Content grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left: Violations */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-slate-800">
                                Violations ({dpa.violations?.length ?? 0})
                            </h2>
                        </div>

                        {(!dpa.violations || dpa.violations.length === 0) && (
                            <p className="text-sm text-slate-500">
                                No violations registered for this DPA.
                            </p>
                        )}

                        <div className="space-y-3">
                            {dpa.violations?.map((v: IViolation, index) => (
                                <div
                                    key={v.id ?? index}
                                    className="rounded-xl border border-slate-200 bg-white p-3"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <p className="text-sm font-medium text-slate-800">
                                            Violation {index + 1}
                                        </p>
                                        {v.severity && (
                                            <span className="inline-flex rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700">
                                                Severity: {v.severity}
                                            </span>
                                        )}
                                    </div>
                                    {v.description && (
                                        <p className="mt-2 text-sm text-slate-700 whitespace-pre-line">
                                            {v.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Meta / Requirements / Communication */}
                <div className="space-y-4">
                    {/* Meta info */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <h2 className="mb-3 text-sm font-semibold text-slate-800">Summary</h2>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between gap-3">
                                <dt className="text-slate-500">Customer</dt>
                                <dd className="font-medium text-slate-800 text-right">
                                    {dpa.customerName}
                                </dd>
                            </div>
                            <div className="flex justify-between gap-3">
                                <dt className="text-slate-500">Product</dt>
                                <dd className="font-medium text-slate-800 text-right">
                                    {dpa.productName}
                                </dd>
                            </div>
                            <div className="flex justify-between gap-3">
                                <dt className="text-slate-500">Violations</dt>
                                <dd className="font-medium text-slate-800 text-right">
                                    {dpa.violations?.length ?? 0}
                                </dd>
                            </div>
                            <div className="flex justify-between gap-3">
                                <dt className="text-slate-500">Requirements</dt>
                                <dd className="font-medium text-slate-800 text-right">
                                    {dpa.requirements?.length ?? 0}
                                </dd>
                            </div>
                            <div className="flex justify-between gap-3">
                                <dt className="text-slate-500">Comm. strategies</dt>
                                <dd className="font-medium text-slate-800 text-right">
                                    {dpa.communicationStrats?.length ?? 0}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Requirements */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <h2 className="mb-3 text-sm font-semibold text-slate-800">
                            Requirements
                        </h2>

                        {(!dpa.requirements || dpa.requirements.length === 0) && (
                            <p className="text-sm text-slate-500">
                                No requirements registered.
                            </p>
                        )}

                        <div className="space-y-3">
                            {dpa.requirements?.map((r: IRequirement, index) => (
                                <div
                                    key={r.id ?? index}
                                    className="rounded-xl border border-slate-200 bg-white p-3"
                                >
                                    <p className="text-sm font-medium text-slate-800">
                                        {r.reqEvaluator || `Requirement ${index + 1}`}
                                    </p>
                                    {r.attributes && Object.keys(r.attributes).length > 0 && (
                                        <pre className="mt-2 max-h-40 overflow-auto rounded-lg bg-slate-900/95 px-3 py-2 text-xs text-slate-100">
{JSON.stringify(r.attributes, null, 2)}
                                        </pre>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Communication strategies */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <h2 className="mb-3 text-sm font-semibold text-slate-800">
                            Communication strategies
                        </h2>

                        {(!dpa.communicationStrats || dpa.communicationStrats.length === 0) && (
                            <p className="text-sm text-slate-500">
                                No communication strategies registered.
                            </p>
                        )}

                        <div className="space-y-3">
                            {dpa.communicationStrats?.map(
                                (c: ICommunicationStrategy, index) => (
                                    <div
                                        key={c.id ?? index}
                                        className="rounded-xl border border-slate-200 bg-white p-3"
                                    >
                                        <p className="text-sm font-medium text-slate-800">
                                            {c.strategyType || `Strategy ${index + 1}`}
                                        </p>
                                        {c.attributes && Object.keys(c.attributes).length > 0 && (
                                            <pre className="mt-2 max-h-40 overflow-auto rounded-lg bg-slate-900/95 px-3 py-2 text-xs text-slate-100">
{JSON.stringify(c.attributes, null, 2)}
                                            </pre>
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DpaDetails;
