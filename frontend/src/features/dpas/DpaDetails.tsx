// src/features/dpas/DpaDetails.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { dpaService } from "../../shared/services/dpaService.ts";
import { Button } from "../../shared/components/Buttons.tsx";
import type { IDPA, IViolation } from "../../shared/types/dpa.types.ts";

// Sæt til true for mock example of false for rigtig data
const USE_MOCK = true;

const buildMockDpa = (idFromRoute?: string): IDPA => ({
    id: idFromRoute ?? "mock-dpa-id",
    customerName: "Mock University",
    productName: "Mock Exam Platform",
    createdDate: new Date().toISOString(),
    fileUrl: "https://example.com/mock-dpa.pdf",
    violations: [
        {
            id: "v1",
            description:
                "Data retention period exceeds the contractual limit of 12 months for exam submissions.",
            severity: "High",
        },
        {
            id: "v2",
            description:
                "Sub-processor list is incomplete and missing two cloud infrastructure providers.",
            severity: "Medium",
        },
        {
            id: "v3",
            description:
                "Minor logging misalignment with documented policy. No direct impact on data subjects.",
            severity: "Low",
        },
    ],
    requirements: [],
    communicationStrats: [],
});

const severityBadgeClasses = (severity?: string) => {
    if (!severity) return "bg-slate-100 text-slate-700";

    const s = severity.toLowerCase();
    if (s === "high" || s === "critical") return "bg-red-100 text-red-700";
    if (s === "medium") return "bg-amber-100 text-amber-700";
    if (s === "low") return "bg-emerald-100 text-emerald-700";

    return "bg-slate-100 text-slate-700";
};

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

        if (USE_MOCK) {
            const mock = buildMockDpa(id);
            setDpa(mock);
            setError(null);
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
            <div className="p-8 text-gray-500">
                Loading DPA...
            </div>
        );
    }

    if (error || !dpa) {
        return (
            <div className="flex flex-col gap-6 px-8 py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-semibold text-slate-700">
                            DPA details
                        </h1>
                    </div>
                    <Button
                        variant="neutral"
                        className="flex items-center gap-1 text-xs"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeftIcon className="h-4 w-4" />
                        Back
                    </Button>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-sm text-red-600">
                        {error ?? "DPA not found."}
                    </p>
                </div>
            </div>
        );
    }

    const created = dpa.createdDate ? new Date(dpa.createdDate) : null;
    const violationsCount = dpa.violations?.length ?? 0;

    return (
        <div className="flex flex-col gap-6 px-8 py-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-semibold text-slate-700">
                        Dpa Details: {dpa.customerName}
                    </h1>
                    {created && (
                        <p className="mt-1 text-xs text-slate-400">
                            Created {created.toLocaleDateString()}{" "}
                            {created.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                    )}
                    {USE_MOCK && (
                        <p className="mt-1 text-[11px] uppercase tracking-wide text-amber-600">
                            Mock data (API calls disabled)
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    {dpa.fileUrl && (
                        <Button
                            variant="primary"
                            className="flex items-center gap-1 text-xs"
                            onClick={() =>
                                window.open(dpa.fileUrl, "_blank", "noopener,noreferrer")
                            }
                        >
                            Open DPA file
                        </Button>
                    )}
                </div>
            </div>

            {/* Content cards */}
            <div className="grid gap-4 lg:grid-cols-3">
                {/* Violations card */}
                <div className="rounded-2xl bg-white p-4 shadow-sm lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-slate-800">
                            Violations
                        </h2>
                        <span className="text-xs text-slate-500">
                            {violationsCount} violation{violationsCount === 1 ? "" : "s"}
                        </span>
                    </div>

                    {violationsCount === 0 && (
                        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-6 text-center">
                            <p className="text-sm font-medium text-gray-700">
                                No violations registered
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                This DPA currently has no recorded violations.
                            </p>
                        </div>
                    )}

                    {violationsCount > 0 && (
                        <div className="space-y-3">
                            {dpa.violations?.map((v: IViolation, index) => (
                                <article
                                    key={v.id ?? index}
                                    className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-semibold text-gray-900">
                                                Violation {index + 1}
                                            </span>
                                        </div>
                                        {v.severity && (
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${severityBadgeClasses(
                                                    v.severity
                                                )}`}
                                            >
                                                {v.severity}
                                            </span>
                                        )}
                                    </div>
                                    {v.description && (
                                        <p className="mt-2 text-sm text-gray-700">
                                            {v.description}
                                        </p>
                                    )}
                                </article>
                            ))}
                        </div>
                    )}
                </div>

                {/* Summary card */}
                <div className="rounded-2xl bg-white p-4 shadow-sm  h-fit">
                    <h2 className="mb-3 text-sm font-semibold text-slate-800">
                        Summary
                    </h2>
                    <dl className="space-y-2 text-sm">
                        <div className="flex items-center justify-between gap-3">
                            <dt className="text-slate-500">Customer</dt>
                            <dd className="text-right font-medium text-slate-800">
                                {dpa.customerName}
                            </dd>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                            <dt className="text-slate-500">Product</dt>
                            <dd className="text-right font-medium text-slate-800">
                                {dpa.productName}
                            </dd>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                            <dt className="text-slate-500">Violations</dt>
                            <dd className="text-right font-medium text-slate-800">
                                {violationsCount}
                            </dd>
                        </div>
                    </dl>
                </div>

                <div>
                    <Button
                        variant="tertiary"
                        className="flex items-center gap-1 text-xs"
                        onClick={() => navigate(-1)}>
                        <ArrowLeftIcon className="h-4 w-4" />
                        Back
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DpaDetails;
