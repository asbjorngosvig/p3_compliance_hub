import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Button } from "../../shared/components/ui/Buttons.tsx";
import { dataProcessorService } from "../../shared/services/DataProcessorService.ts";
import type { IDataProcessor } from "../../shared/types/IDataProcessor.ts";
import { useDataFetching } from "../../shared/hooks/useDataFetching";
import LoadingState from "../../shared/components/ui/LoadingState.tsx";
import ErrorMessage from "../../shared/components/ui/ErrorMessage.tsx";
import PageHeader from "../../shared/components/ui/PageHeader.tsx";
import LocationTag from "../../shared/components/ui/LocationTag.tsx";

export default function DataProcessorDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Fetch data processor with loading/error handling
    const { data: dp, loading, error } = useDataFetching<IDataProcessor>({
        fetchFn: async () => {
            if (!id) throw new Error("Missing data processor id");
            const response = await dataProcessorService.getById(id);
            return response.data;
        },
        dependencies: [id]
    });

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <LoadingState message="Loading data processor..." />
            </div>
        );
    }

    // Error state
    if (error || !dp) {
        return (
            <div className="flex flex-col gap-6 px-8 py-6">
                <PageHeader
                    title="Data processor details"
                    actions={
                        <Button
                            variant="neutral"
                            className="flex items-center gap-1 text-xs"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowLeftIcon className="h-4 w-4" />
                            Back
                        </Button>
                    }
                />
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <ErrorMessage message={error || "Data processor not found."} />
                </div>
            </div>
        );
    }

    const locations = dp.processingLocations || [];
    const locationsCount = locations.length;

    return (
        <div className="flex flex-col gap-6 px-8 py-6">
            {/* Header */}
            <PageHeader
                title={`Data processor details: ${dp.name}`}
                actions={
                    <>
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
                    </>
                }
            />

            {/* Content cards */}
            <div className="grid gap-4 lg:grid-cols-3">
                {/* Main info card */}
                <div className="rounded-2xl bg-white p-4 shadow-sm lg:col-span-2">
                    <h2 className="mb-3 text-sm font-semibold text-slate-800">
                        Data processor information
                    </h2>

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
                            <p className="font-medium text-gray-900">Processing locations</p>
                            {locationsCount === 0 ? (
                                <p className="mt-1 text-sm text-gray-500">Unknown</p>
                            ) : (
                                <div className="mt-1 flex flex-wrap gap-2">
                                    {locations.map((loc, idx) => (
                                        <LocationTag key={idx} location={loc} showDot />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Summary card */}
                <div className="rounded-2xl bg-white p-4 shadow-sm self-start">
                    <h2 className="mb-3 text-sm font-semibold text-slate-800">Summary</h2>
                    <dl className="space-y-2 text-sm">
                        <div className="flex items-center justify-between gap-3">
                            <dt className="text-slate-500">Name</dt>
                            <dd className="text-right font-medium text-slate-800">{dp.name}</dd>
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

                {/* Action buttons */}
                <div className="flex gap-2">
                    <Button
                        variant="tertiary"
                        className="flex items-center gap-1 text-xs"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeftIcon className="h-4 w-4" />
                        Back
                    </Button>

                    <Button
                        variant="tertiary"
                        className="flex items-center gap-1 text-xs"
                        onClick={() => navigate(`/dataprocessors/${dp.id}/edit`)}
                    >
                        <PencilIcon className="h-4 w-4" />
                        Edit
                    </Button>
                </div>
            </div>
        </div>
    );
}