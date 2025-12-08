import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import { dataProcessorService } from "../../shared/services/DataProcessorService";
import { locationsService } from "../../shared/services/LocationsService";
import { useConfirm } from "../../shared/components/ConfirmDialog.tsx";


export default function AddDataProcessor() {
    const navigate = useNavigate();
    const confirm = useConfirm();

    const [processingLocations, setProcessingLocations] = useState<string[]>([]); // chosen processing locations
    const [fetchedLocations, setFetchedLocations] = useState<string[]>([]); // List of locations from backend

    const [name, setName] = useState("");
    const [location, setLocation] = useState(""); // Input holder for location
    const [purpose, setPurpose] = useState("");
    const [service, setService] = useState("");
    const [website, setWebsite] = useState("");
    const [note, setNote] = useState("");
    const [locationError, setLocationError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCreate = async () => {
        setError(null);
        setIsSubmitting(true);

        if (processingLocations.length === 0) {
            setError("Please select at least one processing location.");
            setIsSubmitting(false);
            return;
        }

        try {
            await dataProcessorService.create({
                name,
                processingLocations,
                service,
                purpose,
                note,
                website,
            });

            await confirm({
                title: "Success!",
                message: "The Data Processor was created successfully.",
                confirmText: "OK",
                type: "success"
            });

            navigate(-1);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to create Data Processor. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Fetches processing locations based on what the user has written so far. Is called by the 'onchange' input.
    const fetchLocationsList = async (val: string) => {
        try {
            const res = await locationsService.get("/" + val);
            setFetchedLocations(Array.from(res.data));
        } catch {
            setFetchedLocations([]);
        }
    };

    const handleLocationEnter = (e: any) => {
        if (e.key !== "Enter") return;

        e.preventDefault();
        setLocationError(null);

        if (fetchedLocations.length === 0) {
            setLocationError("No such location found.");
            return;
        }

        const loc = fetchedLocations[0];

        if (processingLocations.includes(loc)) {
            setLocationError("Location already selected.");
            return;
        }

        setProcessingLocations((prev) => [...prev, loc]);
        setLocation("");
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleCreate();
    };

    return (
        <div className="px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900">Add Data Processor</h1>

            <form
                onSubmit={handleSubmit}
                className="mt-6 max-w-xl space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow"
            >
                {error && (
                    <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* Name */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Processor Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. AWS Frankfurt"
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                </div>


                {/* Processing Locations */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                        Processing Locations Country
                    </label>
                    <input
                        type="text"
                        list="processingLocations"
                        value={location}
                        onChange={(e) => {
                            setLocation(e.target.value);
                            fetchLocationsList(e.target.value);
                        }}
                        onClick={() => fetchLocationsList("")}
                        onKeyDown={handleLocationEnter}
                        placeholder="Type to search locations..."
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <datalist id="processingLocations">
                        {fetchedLocations.map((loc, i) => (
                            <option key={i} value={loc} />
                        ))}
                    </datalist>

                    {locationError && (
                        <p className="text-xs text-red-600">{locationError}</p>
                    )}

                    {processingLocations.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {processingLocations.map((loc, index) => (
                                <span
                                    key={index}
                                    onClick={() =>
                                        setProcessingLocations(
                                            processingLocations.filter((l) => l !== loc)
                                        )
                                    }
                                    className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 cursor-pointer hover:bg-slate-200 hover:line-through transition"
                                >
                                    {loc}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Purpose */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Purpose <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        placeholder="e.g. Hosting database"
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                </div>

                {/* Service */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Service <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        placeholder="e.g. Cloud infrastructure (IaaS)"
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                </div>

                {/* Note */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Note <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="e.g. DPA signed 2024-05-01"
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                </div>

                {/* Website */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Website <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="e.g. https://www.example.com"
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                </div>

                {/* Bottom buttons: Back + Submit */}
                <div className="mt-6 flex justify-between">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        disabled={isSubmitting}
                        className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                    >
                        <ArrowLeftIcon className="mr-1 h-4 w-4" />
                        Back
                    </button>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-lg bg-[#7BA043] px-6 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110 disabled:opacity-50"
                    >
                        {isSubmitting ? "Creating..." : "Add Data Processor"}
                    </button>
                </div>
            </form>
        </div>
    );
}