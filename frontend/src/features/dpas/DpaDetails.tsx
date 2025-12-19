import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { dpaService } from "../../shared/services/dpaService.ts";
import { Button} from "../../shared/components/ui/Buttons.tsx";
import type { IDPA } from "../../shared/types/dpa.types.ts";
import { useDataFetching } from "../../shared/hooks/useDataFetching";
import { useDeleteWithConfirm} from "../../shared/hooks/useDeletewithConfirm.ts";
import LoadingState from "../../shared/components/ui/LoadingState";
import ErrorMessage from "../../shared/components/ui/ErrorMessage";
import PageHeader from "../../shared/components/ui/PageHeader.tsx";
import EmptyState from "../../shared/components/ui/EmptyState.tsx";
import ViolationCard from "./ViolationCard.tsx";
import DetailsSummaryCard from "./DetailsSummaryCard.tsx";

export default function DpaDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Fetch DPA with loading/error handling
    const { data: dpa, loading, error } = useDataFetching<IDPA>({
        fetchFn: async () => {
            if (!id) throw new Error("Missing DPA id");
            const data = await dpaService.getById(id);
            return data;
        },
        dependencies: [id]
    });

    // Delete with confirmation
    const { handleDelete } = useDeleteWithConfirm({
        onDelete: async (id) => await dpaService.delete(id),
        getItemName: (dpa: IDPA) => dpa.customerName,
        onSuccess: () => navigate("/dpas")
    });

    const handleDeleteClick = () => {
        if (dpa) handleDelete(dpa, dpa.id);
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <LoadingState message="Loading DPA..." />
            </div>
        );
    }

    // Error state
    if (error || !dpa) {
        return (
            <div className="flex flex-col gap-6 px-8 py-6">
                <PageHeader
                    title="DPA details"
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
                    <ErrorMessage message={error || "DPA not found."} />
                </div>
            </div>
        );
    }

    const created = dpa.createdDate ? new Date(dpa.createdDate) : null;
    const violationsCount = dpa.violations?.length ?? 0;

    return (
        <div className="flex flex-col gap-6 px-8 py-6">
            {/* Header */}
            <PageHeader
                title={`DPA Details: ${dpa.customerName}`}
                subtitle={
                    created
                        ? `Created ${created.toLocaleDateString()} ${created.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}`
                        : undefined
                }
                actions={
                    <>
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
                    </>
                }
            />

            {/* Content cards */}
            <div className="grid gap-4 lg:grid-cols-3">
                {/* Violations card */}
                <div className="rounded-2xl bg-white p-4 shadow-sm lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-slate-800">Violations</h2>
                        <span className="text-xs text-slate-500">
                            {violationsCount} violation{violationsCount === 1 ? "" : "s"}
                        </span>
                    </div>

                    {violationsCount === 0 ? (
                        <EmptyState
                            variant="dashed"
                            title="No violations registered"
                            description="This DPA currently has no recorded violations."
                        />
                    ) : (
                        <div className="space-y-3">
                            {dpa.violations?.map((v, index) => (
                                <ViolationCard
                                    key={v.id ?? index}
                                    index={index + 1}
                                    description={v.description}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Summary card */}
                <DetailsSummaryCard
                    items={[
                        { label: "Customer", value: dpa.customerName },
                        { label: "Product", value: dpa.productName },
                        { label: "Violations", value: violationsCount },
                    ]}
                />

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
                        onClick={handleDeleteClick}
                    >
                        <TrashIcon className="h-4 w-4" />
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}