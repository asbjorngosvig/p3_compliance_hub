import React from "react";
import { useNavigate } from "react-router-dom";

type DataProcessor = {
    id: number;
    name: string;
    hostingCountry: string;
    dpaCount: number;
};

const mockDataProcessors: DataProcessor[] = [
    { id: 1, name: "Uniwise Cloud",   hostingCountry: "Denmark",     dpaCount: 12 },
    { id: 2, name: "Azure EU West",   hostingCountry: "Netherlands", dpaCount: 8 },
    { id: 3, name: "AWS Frankfurt",   hostingCountry: "Germany",     dpaCount: 5 },
    { id: 4, name: "Google Cloud EU", hostingCountry: "Finland",     dpaCount: 3 },
];

const SeeDataProcessors: React.FC = () => {
    const [search, setSearch] = React.useState("");
    const navigate = useNavigate();

    const filteredProcessors = mockDataProcessors.filter((dp) =>
        dp.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="px-8 py-6">
            {/* Side header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Data Processors
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Overview of all processors handling your data, their hosting
                        location and how many DPAs are attached.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => navigate("/dataprocessors/add")}
                    className="rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    Add Data Processor
                </button>
            </div>

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
                    Showing: <span className="font-medium">{filteredProcessors.length}</span>{" "}
                    data processors
                </div>
            </div>

            {/* Grid – hver linje er en DP (store cards) */}
            <div className="space-y-3">
                {filteredProcessors.map((dp) => (
                    <article
                        key={dp.id}
                        className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
                    >
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold text-gray-900">
                                {dp.name}
                            </span>

                            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                                <span className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-1">
                                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                                    Hosting: {dp.hostingCountry}
                                </span>

                                <span className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-1">
                                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-blue-500" />
                                    {dp.dpaCount} DPA{dp.dpaCount !== 1 && "s"}
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="text-xs font-medium text-gray-400 hover:text-gray-600"
                        >
                            View details
                        </button>
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
    );
};

export default SeeDataProcessors;
