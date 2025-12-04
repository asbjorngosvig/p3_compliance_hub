import React, { useState } from "react";

export function Dpaform() {
    const [name, setName] = useState("");
    const [website, setWebsite] = useState("");
    const [contractualSafeguard, setContractualSafeguard] = useState("");
    const [hostingLocation, setHostingLocation] = useState("");
    const [serviceType, setServiceType] = useState("");

    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [errorFileName, setErrorFileName] = useState<string | null>(null);

    const onFilePick = (f: File) => {
        if (f.size > 3 * 1024 * 1024) {
            setErrorFileName(f.name);
            setFile(null);
            setUploadProgress(0);
            return;
        }
        setErrorFileName(null);
        setFile(f);
        setUploadProgress(0);

        const id = setInterval(() => {
            setUploadProgress((p) => {
                if (p >= 100) {
                    clearInterval(id);
                    return 100;
                }
                return p + 8;
            });
        }, 160);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (f) onFilePick(f);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const f = e.dataTransfer.files?.[0];
        if (f) onFilePick(f);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("DPA added (simulated)");
    };

    return (
        <div className="w-full h-full flex justify-center px-4">
            <div className="w-full max-w-5xl rounded-2xl border border-gray-200 bg-white shadow-lg text-black p-6 sm:p-8 md:p-10">
                <form onSubmit={handleSubmit} className="flex flex-col h-full max-h-[calc(100vh-150px)]">
                <h2 className="mb-6 text-3xl font-semibold text-black">Form placement</h2>

                <div className="flex-1 overflow-y-auto pr-1 space-y-6">

                    {/* Name */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-black">Name</label>
                        <input
                            type="text"
                            placeholder="e.g. AAU"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-lg border border-gray-400 p-4 outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Website */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-black">Website</label>
                        <input
                            type="url"
                            placeholder="e.g. https://www.example.com"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            className="w-full rounded-lg border border-gray-400 p-4 outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Contractual Safeguard */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-black">Contractual Safeguard</label>
                        <input
                            type="text"
                            placeholder="e.g. Intra-EU processing only"
                            value={contractualSafeguard}
                            onChange={(e) => setContractualSafeguard(e.target.value)}
                            className="w-full rounded-lg border border-gray-400 p-4 outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Hosting Location */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-black">Hosting Location</label>
                        <input
                            type="text"
                            placeholder="e.g. Denmark"
                            value={hostingLocation}
                            onChange={(e) => setHostingLocation(e.target.value)}
                            className="w-full rounded-lg border border-gray-400 p-4 outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Type of Service */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-black">Type of Service</label>
                        <input
                            type="text"
                            placeholder="e.g. exam management platform"
                            value={serviceType}
                            onChange={(e) => setServiceType(e.target.value)}
                            className="w-full rounded-lg border border-gray-400 p-4 outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Upload zone */}
                    <div>
                        <div
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                            className="rounded-xl border-2 border-dashed border-gray-400 p-10 text-center"
                        >
                            <input
                                id="fileUpload"
                                type="file"
                                accept=".pdf,.png,.jpg,.jpeg,.gif,.svg"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <label htmlFor="fileUpload" className="cursor-pointer text-blue-600 underline">Link</label>
                            <span> or drag and drop</span>
                            <p className="mt-2 text-sm text-gray-600">PDF, SVG, PNG, JPG or GIF (max. 3MB)</p>
                        </div>

                        {file && (
                            <div className="mt-4 rounded-lg border p-4 text-sm text-black">
                                <div className="mb-1 flex items-center justify-between">
                                    <div className="font-medium">{file.name}</div>
                                    <button
                                        type="button"
                                        onClick={() => { setFile(null); setUploadProgress(0); }}
                                        className="rounded p-1 text-gray-700 hover:bg-gray-100"
                                    >
                                        🗑️
                                    </button>
                                </div>
                                <div className="mb-1 text-gray-600">
                                    {Math.round(file.size / 1024)}kb • Loading
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded bg-gray-200">
                                    <div className="h-2 rounded bg-blue-400" style={{ width: `${uploadProgress}%` }} />
                                </div>
                            </div>
                        )}

                        {errorFileName && (
                            <div className="mt-4 rounded-lg border p-4 text-sm text-black">
                                <div className="mb-2 font-semibold text-red-600">Upload failed.</div>
                                <div className="mb-1 flex items-center justify-between">
                                    <div>{errorFileName}</div>
                                    <button
                                        type="button"
                                        onClick={() => setErrorFileName(null)}
                                        className="rounded p-1 text-gray-700 hover:bg-gray-100"
                                    >
                                        🗑️
                                    </button>
                                </div>
                                <div className="mb-1 text-red-600">File too large • Failed</div>
                                <div className="h-2 w-full overflow-hidden rounded bg-red-100">
                                    <div className="h-2 w-2/3 rounded bg-red-400" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        className="rounded-lg bg-[#7BA043] px-6 py-2 text-white hover:brightness-110"
                    >
                        Add DPA
                    </button>
                </div>
            </form>
        </div>
        </div>
    );
}

export default Dpaform;
