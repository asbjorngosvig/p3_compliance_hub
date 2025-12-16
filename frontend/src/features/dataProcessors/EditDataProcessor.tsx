import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { dataProcessorService } from "../../shared/services/DataProcessorService.ts";
import { locationsService } from "../../shared/services/LocationsService";
import { useConfirm } from "../../shared/components/ConfirmDialog.tsx";
import Loader from "../../shared/components/Loader.tsx";

const EditDataProcessor: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const confirm = useConfirm();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [name, setName] = useState("");
    const [service, setService] = useState("");
    const [purpose, setPurpose] = useState("");
    const [note, setNote] = useState("");
    const [website, setWebsite] = useState("");
    const [processingLocations, setProcessingLocations] = useState<string[]>([]);
    const [fetchedLocations, setFetchedLocations] = useState<string[]>([]);
    const [location, setLocation] = useState("");
    const [locationError, setLocationError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError("Missing data processor id");
            setLoading(false);
            return;
        }

        const fetchDp = async () => {
            try {
                setLoading(true);
                const response = await dataProcessorService.getById(id);
                const data = response.data;
                setName(data.name);
                setService(data.service);
                setPurpose(data.purpose);
                setNote(data.note);
                setWebsite(data.website);
                setProcessingLocations(data.processingLocations || []);
            } catch (e) {
                console.error(e);
                setError("Failed to load data processor.");
            } finally {
                setLoading(false);
            }
        };

        fetchDp();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        if (!id) {
            setError("Missing data processor id");
            setLoading(false);
            return;
        }

        if (processingLocations.length === 0) {
            setError("Please select at least one processing location.");
            setIsSubmitting(false);
            return;
        }

        try {
            await dataProcessorService.update(id!, {
                name,
                service,
                purpose,
                note,
                website,
                processingLocations,
            });

            await confirm({
                title: "Success!",
                message: "Data processor updated successfully.",
                confirmText: "OK",
                type: "success",
            });

            navigate(`/dataprocessors/${id}`);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to update. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

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

    if (loading) return <div className="p-8 text-gray-500">Loading...</div>;
    if (error) return <div className="p-8 text-red-600">{error}</div>;

    return (
        <div className="px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900">Edit Data Processor</h1>

            <form
                onSubmit={handleSubmit}
                className="mt-6 max-w-xl space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow"
            >
                {error && <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>}

                {/* Name */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Processor Name <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                </div>

                {/* Locations */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Processing Locations</label>
                    <input
                        type="text"
                        list="locations"
                        value={location}
                        onChange={(e) => {
                            setLocation(e.target.value);
                            fetchLocationsList(e.target.value);
                        }}
                        onClick={() => fetchLocationsList("")}
                        onKeyDown={handleLocationEnter}
                        placeholder="Type to search locations..."
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                    <datalist id="locations">
                        {fetchedLocations.map((loc, i) => (<option key={i} value={loc} />))}
                    </datalist>

                    {locationError && <p className="text-xs text-red-600">{locationError}</p>}
                    {processingLocations.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {processingLocations.map((loc, i) => (
                                <span key={i} onClick={() => setProcessingLocations(processingLocations.filter((l) => l !== loc))}
                                      className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 cursor-pointer hover:bg-slate-200 hover:line-through transition">{loc}</span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Purpose */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Purpose <span className="text-red-500">*</span></label>
                    <input type="text" value={purpose} onChange={(e) => setPurpose(e.target.value)} required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"/>
                </div>

                {/* Service */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Service <span className="text-red-500">*</span></label>
                    <input type="text" value={service} onChange={(e) => setService(e.target.value)} required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"/>
                </div>

                {/* Note */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Note</label>
                    <input type="text" value={note} onChange={(e) => setNote(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"/>
                </div>

                {/* Website */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Website</label>
                    <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"/>
                </div>

                {/* Bottom buttons: Back + Submit */}
                <div className="mt-6 flex justify-between">
                    <button type="button" onClick={() => navigate(-1)} disabled={isSubmitting} className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50">
                        <ArrowLeftIcon className="mr-1 h-4 w-4" /> Back
                    </button>

                    <button type="submit" disabled={isSubmitting} className="rounded-lg bg-[#7BA043] px-6 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110 disabled:opacity-50">
                        {isSubmitting ? <Loader /> : "Update Data Processor"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditDataProcessor;
