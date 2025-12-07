import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { dpaService} from "../../shared/services/dpaService.ts";
import type { CreateDPARequest} from "../../shared/types/dpa.types.ts";

const Dpaform: React.FC = () => {
    const navigate = useNavigate();

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
                        Product/Service Name <span className="text-red-500">*</span>
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
                        placeholder="e.g. https://www.example.com/dpa.pdf"
                        value={fileUrl}
                        onChange={(e) => setFileUrl(e.target.value)}
                        required
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-200"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                        Enter the URL where the DPA document is hosted
                    </p>
                </div>

                {/* Info box about requirements and strategies */}
                <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-700">
                    <p className="font-medium mb-1">Note:</p>
                    <p>Requirements and communication strategies can be added after creating the DPA.</p>
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