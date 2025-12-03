import { useState } from "react";
import type { FormEvent } from "react";
import { dataProcessorService } from "../../shared/services/DataProcessorService";

export default function AddDataProcessor() {
    const [name, setName] = useState("");
    const [processingLocations, setProcessingLocations] = useState<string[]>([]);

    const [processingLocation, setProcessingLocation] = useState("");
    const [purpose, setPurpose] = useState("");
    const [service, setService] = useState("");
    const [website, setWebsite] = useState("");
    const [note, setNote] = useState("");



    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleLogin();
    };

    const handleLogin = async () => {
        try {
            await dataProcessorService.create({name, processingLocations, service, purpose, note, website});
        } catch (err) {
            alert("Error adding data processor");
            console.error(err);
        }
    };
    return (
        <div className="px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900">Add Data Processor</h1>
            <p className="mt-1 text-gray-500">
                Fill in the required information to add a new data processor.
            </p>

            <form
                onSubmit={handleSubmit}
                className="mt-6 max-w-xl space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow"
            >
                {/* Name */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Processor Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. AWS Frankfurt"
                        required
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Hosting Country */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Processing locations Country
                    </label>
                    <input
                        type="search"
                        value={processingLocation}
                        onChange={(e) => {
                                    let locations: string[] = processingLocations;
                                    locations.push(e.target.value);
                                    setProcessingLocations(locations);
                                    
                                    setProcessingLocation(e.target.value);
                                    e.target.value = "";
                                }
                        }
                        placeholder="e.g. Germany"
                        required
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* purpose */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Purpose
                    </label>
                    <input
                        type="text"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        placeholder="..."
                        required
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-green-500"
                    />
                </div>


                {/* Service */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Service
                    </label>
                    <input
                        type="text"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        placeholder="..."
                        required
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-green-500"
                    />
                </div>


                {/* Note */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Note
                    </label>
                    <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="..."
                        required
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-green-500"
                    />
                </div>


                {/* Website */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Website
                    </label>
                    <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="..."
                        required
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-green-500"
                    />
                </div>


                {/* Submit */}
                <button
                    type="submit"
                    className="w-full rounded-lg bg-green-600 py-2.5 text-center text-sm font-medium text-white shadow hover:bg-green-700"
                >
                    Add Data Processor
                </button>
            </form>
        </div>
    );
}
