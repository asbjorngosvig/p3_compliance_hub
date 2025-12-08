import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "../../shared/components/Buttons.tsx";
import { dataProcessorService } from "../../shared/services/DataProcessorService.ts";
import type { IDataProcessor } from "../../shared/types/IDataProcessor.ts";

// Sæt til true for at bruge mock data og false for rigtig data
const USE_MOCK = false; // set to false when the API works

const buildMockDataProcessor = (idFromRoute?: string): IDataProcessor => ({
    id: idFromRoute ?? "mock-dp-id",
    name: "Mock Cloud Provider",
    processingLocations: ["EU (Frankfurt)", "EU (Paris)"],
    service: "Cloud hosting and exam platform infrastructure",
    purpose: "Host exam platform workloads and associated student data.",
    note: "Sub-processors include Mock Storage Inc. and Mock Analytics GmbH.",
    website: "https://example-processor.com",
});

const DataProcessorDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [dp, setDp] = useState<IDataProcessor | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError("Missing data processor id");
            setLoading(false);
            return;
        }

        if (USE_MOCK) {
            const mock = buildMockDataProcessor(id);
            setDp(mock);
            setError(null);
            setLoading(false);
            return;
        }

        const fetchDp = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await dataProcessorService.getById(id);
                setDp(response.data);
            } catch (e) {
                console.error("Failed to fetch data processor:", e);
                setError("Failed to load data processor. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchDp();
    }, [id]);

    if (loading) {
        return <div className="p-8 text-gray-500">Loading data processor...</div>;
    }

    if (error || !dp) {
        return (
            <div className="flex flex-col gap-6 px-8 py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-semibold text-slate-700">
                            Data processor details
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
                        {error ?? "Data processor not found."}
                    </p>
                </div>
            </div>
        );
    }

    const locations = dp.processingLocations || [];
    const locationsCount = locations.length;

    return (
        <div className="flex flex-col gap-6 px-8 py-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-semibold text-slate-700">
                        Data processor details: {dp.name}
                    </h1>

                    {USE_MOCK && (
                        <p className="mt-1 text-[11px] uppercase tracking-wide text-amber-600">
                            Mock data (API calls disabled)
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    {dp.website && (
                        <Button
                            variant="primary"
                            className="flex items-center gap-1 text-xs"
                            onClick={() =>
                                window.open(dp.website, "_blank", "noopener,noreferrer")
                            }
                        >
                            Open website
                        </Button>
                    )}

                </div>
            </div>

            {/* Content cards */}
            <div className="grid gap-4 lg:grid-cols-3">
                {/* Main info card */}
                <div className="rounded-2xl bg-white p-4 shadow-sm lg:col-span-2">
                    <h2 className="mb-3 text-sm font-semibold text-slate-800">
                        Data processor information
                    </h2>

                    {/* Service / purpose */}
                    <div className="space-y-3 text-sm text-gray-700">
                        {dp.service && (
                            <div>
                                <p className="font-medium text-gray-900">Service</p>
                                <p className="mt-0.5">{dp.service}</p>
                            </div>
                        )}

                        {dp.purpose && (
                            <div>
                                <p className="font-medium text-gray-900">Purpose</p>
                                <p className="mt-0.5">{dp.purpose}</p>
                            </div>
                        )}

                        {dp.note && (
                            <div>
                                <p className="font-medium text-gray-900">Notes</p>
                                <p className="mt-0.5">{dp.note}</p>
                            </div>
                        )}

                        {/* Processing locations */}
                        <div>
                            <p className="font-medium text-gray-900">
                                Processing locations
                            </p>
                            {locationsCount === 0 ? (
                                <p className="mt-1 text-sm text-gray-500">Unknown</p>
                            ) : (
                                <div className="mt-1 flex flex-wrap gap-2">
                                    {locations.map((loc, idx) => (
                                        <span
                                            key={idx}
                                            className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-1 text-xs text-gray-700"
                                        >
                                            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                                            {loc}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Summary card */}
                <div className="rounded-2xl bg-white p-4 shadow-sm self-start">
                    <h2 className="mb-3 text-sm font-semibold text-slate-800">
                        Summary
                    </h2>
                    <dl className="space-y-2 text-sm">
                        <div className="flex items-center justify-between gap-3">
                            <dt className="text-slate-500">Name</dt>
                            <dd className="text-right font-medium text-slate-800">
                                {dp.name}
                            </dd>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                            <dt className="text-slate-500">Website</dt>
                            <dd className="text-right font-medium text-slate-800">
                                {dp.website || "N/A"}
                            </dd>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                            <dt className="text-slate-500">Locations</dt>
                            <dd className="text-right font-medium text-slate-800">
                                {locationsCount}
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

export default DataProcessorDetails;
