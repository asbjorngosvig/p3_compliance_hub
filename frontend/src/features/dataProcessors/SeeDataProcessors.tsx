import { useNavigate } from "react-router-dom";
import { TrashIcon, DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { IDataProcessor } from "../../shared/types/IDataProcessor.ts";
import { dataProcessorService } from "../../shared/services/DataProcessorService.ts";
import { Button } from "../../shared/components/ui/Buttons.tsx";
import { useDataFetching } from "../../shared/hooks/useDataFetching";
import { useSearch } from "../../shared/hooks/useSearch";
import { useDeleteWithConfirm} from "../../shared/hooks/useDeletewithConfirm.ts";
import SearchInput from "../../shared/components/form/SearchInput.tsx";
import LoadingState from "../../shared/components/ui/LoadingState.tsx";
import EmptyState from "../../shared/components/ui/EmptyState.tsx";
import PageHeader from "../../shared/components/ui/PageHeader.tsx";
import LocationTag from "../../shared/components/ui/LocationTag.tsx";

export default function SeeDataProcessors() {
    const navigate = useNavigate();

    // Fetch data processors with loading/error handling
    const { data: dataProcessors, loading, refetch } = useDataFetching({
        fetchFn: async () => {
            const response = await dataProcessorService.getAll();
            return response.data.allDataProcessors;
        }
    });

    // Search functionality
    const { searchTerm, setSearchTerm, filteredData: filteredProcessors } = useSearch({
        data: dataProcessors || [],
        searchKeys: ['name']
    });

    // Delete functionality with confirmation
    const { handleDelete } = useDeleteWithConfirm({
        onDelete: async (id) => {
            await dataProcessorService.deleteById(id);
        },
        getItemName: (dp: IDataProcessor) => dp.name,
        onSuccess: refetch
    });

    const handleDeleteClick = (dp: IDataProcessor) => {
        if (!dp.id) {
            alert(`Data processor "${dp.name}" does not have a valid ID and cannot be deleted.`);
            return;
        }
        handleDelete(dp, dp.id);
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <LoadingState message="Loading data processors..." />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 px-8 py-6">
            {/* Header with Add button */}
            <PageHeader
                title="Data Processors"
                actions={
                    <Button to="/dataprocessors/add" variant="primary">
                        Add Data Processor
                    </Button>
                }
            />

            {/* Search + grid section */}
            <div className="rounded-2xl bg-white p-4 shadow-sm">
                {/* Search bar + count */}
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <SearchInput
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search in data processors"
                        className="w-full max-w-md"
                    />
                    <div className="text-xs text-gray-500 md:text-sm">
                        Showing: <span className="font-medium">{filteredProcessors.length}</span> data processors
                    </div>
                </div>

                {/* Data processor cards */}
                <div className="space-y-3">
                    {filteredProcessors.map((dp) => (
                        <article
                            key={dp.id}
                            className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm hover:bg-gray-50 cursor-pointer"
                            onClick={() => dp.id && navigate(`/dataprocessors/${dp.id}`)}
                        >
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-semibold text-gray-900">
                                    {dp.name}
                                </span>
                                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                                    {dp.processingLocations && dp.processingLocations.length > 0 ? (
                                        <>
                                            <span className="text-gray-500">Processing Locations:</span>
                                            {dp.processingLocations.map((loc, idx) => (
                                                <LocationTag key={idx} location={loc} showDot />
                                            ))}
                                        </>
                                    ) : (
                                        <span className="text-gray-400">No locations specified</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    variant="neutral"
                                    className="flex items-center gap-1 text-xs"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (dp.id) navigate(`/dataprocessors/${dp.id}`);
                                    }}
                                >
                                    <DocumentMagnifyingGlassIcon className="h-4 w-4" />
                                    View
                                </Button>
                                <Button
                                    variant="neutral"
                                    className="flex items-center gap-1 text-xs"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteClick(dp);
                                    }}
                                >
                                    <TrashIcon className="h-4 w-4" />
                                    Delete
                                </Button>
                            </div>
                        </article>
                    ))}

                    {/* Empty state */}
                    {filteredProcessors.length === 0 && (
                        <EmptyState
                            variant="dashed"
                            title="No data processors found"
                            description="Try adjusting your search or add a new data processor."
                        />
                    )}
                </div>
            </div>
        </div>
    );
}