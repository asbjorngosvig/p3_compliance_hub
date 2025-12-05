import { useNavigate } from "react-router-dom";

export function Dpaform() {
    const navigate = useNavigate();

    return (
        <div className="relative bg-white rounded-2xl p-8 shadow-sm w-full max-w-3xl">
            {/* Close (X) button INSIDE the form box */}
            <button
                onClick={() => navigate(-1)}
                className="absolute right-6 top-6 rounded-full p-2 text-slate-500
                   hover:bg-slate-100 hover:text-slate-700 transition"
                aria-label="Close and return to previous page"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

            {/* Form content */}
            <h2 className="text-2xl font-semibold mb-6">Form placement</h2>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. AAU"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2
                       text-sm focus:bg-white focus:ring-2 focus:ring-slate-200 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Website
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. https://www.example.com"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2
                       text-sm focus:bg-white focus:ring-2 focus:ring-slate-200 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Contractual Safeguard
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Intra-EU processing only"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2
                       text-sm focus:bg-white focus:ring-2 focus:ring-slate-200 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Hosting Location
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Denmark"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2
                       text-sm focus:bg-white focus:ring-2 focus:ring-slate-200 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Type of Service
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. exam management platform"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2
                       text-sm focus:bg-white focus:ring-2 focus:ring-slate-200 outline-none"
                    />
                </div>

                {/* File upload box */}
                <div className="border border-dashed border-slate-300 rounded-xl p-6 text-center">
                    <span className="text-blue-600 font-medium cursor-pointer">Link</span>
                    <span className="text-slate-500"> or drag and drop</span>
                    <p className="text-xs text-slate-400 mt-1">
                        PDF, SVG, PNG, JPG or GIF (max. 3MB)
                    </p>
                </div>

                <button
                    type="submit"
                    className="bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium
                     hover:bg-green-800 transition"
                >
                    Add DPA
                </button>
            </div>
        </div>
    );
}
