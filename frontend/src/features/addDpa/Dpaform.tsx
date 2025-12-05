import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const Dpaform: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // TODO: hook this up to your real submit logic later
        console.log("Add DPA form submitted");
    };

    return (
        <section className="flex-1 rounded-2xl bg-white p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Header */}
                <h1 className="mb-4 text-2xl font-semibold tracking-tight">
                    Form placement
                </h1>

                {/* Name */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-700">
                        Name
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. AAU"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-200"
                    />
                </div>

                {/* Website */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-700">
                        Website
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. https://www.example.com"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-200"
                    />
                </div>

                {/* Contractual Safeguard */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-700">
                        Contractual Safeguard
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Intra-EU processing only"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-200"
                    />
                </div>

                {/* Hosting Location */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-700">
                        Hosting Location
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Denmark"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-200"
                    />
                </div>

                {/* Type of Service */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-700">
                        Type of Service
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. exam management platform"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-200"
                    />
                </div>

                {/* File upload dropzone (dummy) */}
                <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                    <span className="cursor-pointer font-medium text-[#2A5D83]">
                        Link
                    </span>{" "}
                    or drag and drop
                    <div className="mt-1 text-xs text-slate-400">
                        PDF, SVG, PNG, JPG or GIF (max. 3MB)
                    </div>
                </div>

                {/* Bottom: Back + Add DPA */}
                <div className="mt-6 flex justify-between">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                        <ArrowLeftIcon className="mr-1 h-4 w-4" />
                        Back
                    </button>

                    <button
                        type="submit"
                        className="rounded-lg bg-[#7BA043] px-6 py-2 text-sm font-medium text-white shadow-sm transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#7BA043]/40"
                    >
                        Add DPA
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Dpaform;
