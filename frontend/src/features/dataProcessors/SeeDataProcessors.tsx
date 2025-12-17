import React, { useEffect, useState } from "react";
import type { IDataProcessor } from "../../shared/types/IDataProcessor.ts";
import { dataProcessorService } from "../../shared/services/DataProcessorService.ts";
import { Button } from "../../shared/components/Buttons.tsx";
import { useConfirm } from "../../shared/components/ConfirmDialog.tsx";
import {
    TrashIcon,
    DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const SeeDataProcessors: React.FC = () => {
    const [search, setSearch] = useState("");
    const [dataProcessors, setDataProcessors] = useState<IDataProcessor[]>([]);
    const [loading, setLoading] = useState(true);

    const confirm = useConfirm();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dataProcessorService.getAll();
                setDataProcessors(response.data.allDataProcessors);
            } catch (error) {
                console.error("Failed to fetch data processors:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (dp: IDataProcessor) => {
        if (!dp.id) {
            await confirm({
                title: "Cannot Delete",
                message: `Data processor "${dp.name}" does not have a valid ID and cannot be deleted.`,
                confirmText: "OK",
                cancelText: "",
                type: "danger",
            });
            return;
        }

        const ok = await confirm({
            title: "Delete Data Processor",
            message: `Are you sure you want to delete "${dp.name}"? This action cannot be undone.`,
            confirmText: "Delete",
            cancelText: "Cancel",
            type: "danger",
        });

        if (!ok) return;

        try {
            await dataProcessorService.deleteById(dp.id);
            setDataProcessors((prev) => prev.filter((x) => x.id !== dp.id));
        } catch (error) {
            console.error("Failed to delete:", error);
        }
    };

    const filteredProcessors = dataProcessors.filter((dp) =>
        dp.name.toLowerCase().includes(search.toLowerCase()),
    );

    if (loading) {
        return <div className="p-8 text-gray-500">Loading data processors...</div>;
    }

    return (
        <div className="flex flex-col gap-6 px-8 py-6">
            {/* Header + Add button */}
            <div>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-semibold text-slate-700">
                            Data Processors
                        </h1>
                    </div>
                    <Button to="/dataprocessors/add" variant="primary">
                        Add Data Processor
                    </Button>
                </div>
            </div>

            {/* Search + grid */}
            <div className="rounded-2xl bg-white p-4 shadow-sm">
                {/* Search + count */}
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search in data processors"
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-100"
                        />
                    </div>
                    <div className="text-xs text-gray-500 md:text-sm">
                        Showing:{" "}
                        <span className="font-medium">
                            {filteredProcessors.length}
                        </span>{" "}
                        data processors
                    </div>
                </div>

                {/* Grid */}
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
                                    <span className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-1">
                                        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                                        Processing Locations:{" "}
                                        {(dp as any).processingLocations ||
                                            dp.processingLocations ||
                                            "Unknown"}
                                    </span>


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
                                        handleDelete(dp);
                                    }}
                                >
                                    <TrashIcon className="h-4 w-4" />
                                    Delete
                                </Button>
                            </div>
                        </article>
                    ))}

                    {filteredProcessors.length === 0 && (
                        <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-center">
                            <p className="text-sm font-medium text-gray-700">
                                No data processors found
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                Try adjusting your search or add a new data processor.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SeeDataProcessors;
