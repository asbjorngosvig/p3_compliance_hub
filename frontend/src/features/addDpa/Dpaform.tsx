import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { dpaService } from "../../shared/services/dpaService";
import { locationsService } from "../../shared/services/LocationsService";
import type { CreateDPARequest } from "../../shared/types/dpa.types";
import { useConfirm} from "../../shared/components/ConfirmDialog.tsx";

const Dpaform: React.FC = () => {
    const navigate = useNavigate();
    const confirm = useConfirm();

    const [customerName, setCustomerName] = useState("");
    const [productName, setProductName] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const [processingLocations, setProcessingLocations] = useState<string[]>([]);
    const [fetchedLocations, setFetchedLocations] = useState<string[]>([]);
    const [location, setLocation] = useState("");
    const [needWrittenAprooval, setNeedWrittenAprooval] = useState(false);
    const [daysOfNotice, setDaysOfNotice] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        // Required checks
        if (processingLocations.length === 0) {
            setError("Please select at least one processing location.");
            setIsSubmitting(false);
            return;
        }

        if (daysOfNotice === "" || Number(daysOfNotice) < 0) {
            setError("Days of notice is required and must be a non-negative number.");
            setIsSubmitting(false);
            return;
        }

        try {
            const requestData: CreateDPARequest = {
                allowedProcessingLocations: processingLocations,
                needWrittenAprooval,
                daysOfNotice: Number(daysOfNotice),
                customerName,
                productName,
                fileUrl,
            };

            await dpaService.create(requestData);

            // OPTIONAL: show success confirmation
            await confirm({
                title: "Success!",
                message: "The DPA was created successfully.",
                confirmText: "OK",
                type: "success"
            });

            navigate(-1);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to create DPA. Please try again.");
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

    return (
        <section className="flex-1 rounded-2xl bg-white p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h1 className="mb-4 text-2xl font-semibold tracking-tight">Add New DPA</h1>

                {error && (
                    <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* Customer Name */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-700">
                        Customer Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        placeholder="e.g. AAU"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-200 placeholder:text-slate-400"
                    />
                </div>

                {/* Product Name */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-700">
                        Type of Service <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                        placeholder="e.g. Exam Management Platform"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-200 placeholder:text-slate-400"
                    />
                </div>

                {/* File URL */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-700">
                        DPA Document URL <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="url"
                        value={fileUrl}
                        onChange={(e) => setFileUrl(e.target.value)}
                        required
                        placeholder="e.g. https://www.example.com/dpa.pdf"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-200 placeholder:text-slate-400"
                    />
                </div>

                {/* Allowed Processing Locations */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-700">
                        Allowed Processing Locations
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
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-200 placeholder:text-slate-400"
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

                {/* Approval checkbox */}
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={needWrittenAprooval}
                        onChange={(e) => setNeedWrittenAprooval(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-[#7BA043]"
                    />
                    <span className="text-sm font-medium text-slate-700">
                        Requires written approval before data processor changes
                    </span>
                </div>

                {/* Days of Notice */}
                <input
                    type="number"
                    min="0"
                    value={daysOfNotice}
                    onChange={(e) => {
                        const v = e.target.value;
                        // allow empty input
                        if (v === "") {
                            setDaysOfNotice("");
                            return;
                        }
                        // allow only positive integers
                        if (/^\d+$/.test(v)) {
                            setDaysOfNotice(v);
                        }
                    }}
                    placeholder="e.g. 30"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-200 placeholder:text-slate-400"
                />

                {/* Bottom buttons */}
                <div className="mt-6 flex justify-between">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        disabled={isSubmitting}
                        className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                    >
                        <ArrowLeftIcon className="mr-1 h-4 w-4" />
                        Back
                    </button>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-lg bg-[#7BA043] px-6 py-2 text-sm font-medium text-white shadow-sm transition hover:brightness-110 disabled:opacity-50"
                    >
                        {isSubmitting ? "Creating..." : "Add DPA"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Dpaform;
