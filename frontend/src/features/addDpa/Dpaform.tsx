import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { dpaService} from "../../shared/services/dpaService.ts";
import type { CreateDPARequest} from "../../shared/types/dpa.types.ts";
import { locationsService } from "../../shared/services/LocationsService";

const Dpaform: React.FC = () => {
    const navigate = useNavigate();

    const [processingLocations, setProcessingLocations] = useState<string[]>([]); // chosen processing locations
    const [fetchedLocations, setFetchedLocations] = useState<string[]>([]); // List of locations from backend
    const [location, setLocation] = useState(""); // Input holder for location
    // Form state
    const [customerName, setCustomerName] = useState("");
    const [productName, setProductName] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);



    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            // Prepare the request payload
            const requestData: CreateDPARequest = {
                requirements: [], // Empty for now, can be added later
                communicationStrategies: [], // Empty for now, can be added later
                customerName,
                productName,
                fileUrl,
            };

            // Call the API
            const response = await dpaService.create(requestData);

            console.log("DPA created successfully:", response.createdDPA);

            // Navigate back or to a success page
            navigate(-1);
        } catch (err: any) {
            console.error("Error creating DPA:", err);
            setError(err.response?.data?.message || "Failed to create DPA. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    const fetchLocationsList = async (location: String) => {
        try {
            let res = await locationsService.get("/" + location);
            setFetchedLocations(Array.from(res.data));
        } catch (err) {
            alert("Error getting locations");
        }
    };
    return (
        <section className="flex-1 rounded-2xl bg-white p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Header */}
                <h1 className="mb-4 text-2xl font-semibold tracking-tight">
                    Add New DPA
                </h1>

                {/* Error message */}
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
                        placeholder="e.g. AAU"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-200"
                    />
                </div>

                {/* Product Name */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-700">
                        Type of Service <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Exam Management Platform"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-200"
                    />
                </div>

                {/* File URL */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-700">
                        DPA Document URL <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="url"
                        placeholder="https://www.example.com"
                        value={fileUrl}
                        onChange={(e) => setFileUrl(e.target.value)}
                        required
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-200"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                        Enter the URL where the DPA document is hosted
                    </p>
                </div>
                {/* */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Allowed processing locations
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
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                if (fetchedLocations.length === 0) {
                                    alert("No such location");
                                    return;
                                }
                                let loc = fetchedLocations[0];
                                if (processingLocations.includes(loc)) {
                                    alert("Location already selected");
                                    return;
                                }
                                e.preventDefault();
                                if (loc.trim().length > 0) {
                                    setProcessingLocations((prev) => [...prev, loc]);
                                    setLocation(""); // clear input
                                }
                            }
                        }}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    {/* Laver en dropdown ud fra alle de fetchede locations fra backend*/}
                    <datalist id="processingLocations">
                        {fetchedLocations.map((loc, i) => (
                            <option key={i} value={loc}></option>
                        ))}
                    </datalist>

                    {/* Shows all currently selected processingLocations*/}
                    {processingLocations.map((loc) => (
                        <p // Hover effects and logic for deleting a selected processor by clicking it
                            onMouseEnter={(e) => {
                                if (e.target instanceof HTMLParagraphElement)
                                    e.target.style.textDecoration = "line-through";
                            }}
                            onMouseOut={(e) => {
                                if (e.target instanceof HTMLParagraphElement)
                                    e.target.style.textDecoration = "none";
                            }}
                            onMouseOver={(e) => {
                                if (e.target instanceof HTMLParagraphElement)
                                    e.target.style.cursor = "pointer";
                            }}
                            //Filters out the clicked location. Works as a deletion
                            onClick={() =>
                                setProcessingLocations(
                                    processingLocations.filter((loc1) => loc1 !== loc)
                                )
                            }
                        >
                            {loc}
                        </p>
                    ))}
                </div>



                {/* Bottom: Back + Add DPA */}
                <div className="mt-6 flex justify-between">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        disabled={isSubmitting}
                        className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ArrowLeftIcon className="mr-1 h-4 w-4" />
                        Back
                    </button>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-lg bg-[#7BA043] px-6 py-2 text-sm font-medium text-white shadow-sm transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#7BA043]/40 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Creating..." : "Add DPA"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Dpaform;