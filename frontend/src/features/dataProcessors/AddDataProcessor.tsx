import { useState } from "react";
import type { FormEvent } from "react";

import { dataProcessorService } from "../../shared/services/DataProcessorService";

import {Button} from '../../shared/components/Buttons.tsx'


export default function AddDataProcessor() {
    const [name, setName] = useState("");
    const [processingLocations, setProcessingLocations] = useState<string[]>([]);

    const [location, setLocation] = useState("");
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
            await dataProcessorService.create({
              name,
              processingLocations,
              service,
              purpose,
              note,
              website,
            });
        } catch (err) {
            alert("Error adding data processor");
            console.error(err);
        }
    };
    return (
        <div className="px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900">Add Data Processor</h1>

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
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                </div>

                {/* Hosting Country */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Processing locations Country
                    </label>
                    <input
                        type="search"
                        value={location}
                        onChange={(e) => {
                                    let locations: string[] = processingLocations;
                                    locations.push(e.target.value);
                                    setProcessingLocations(locations);

                                    setLocation(e.target.value);
                                    e.target.value = "";
                                }
                        }
                        placeholder="e.g. Germany"
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                </div>

                {/* Purpose */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Purpose
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
                        Service
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
                        Note
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
                        Website
                    </label>
                    <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="e.g. https://www.example.com"
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                </div>


                {/* Submit */}
            <Button to="/dashboard" variant="primary">Add Data Processor</Button>
            </form>
        </div>
    );
}
