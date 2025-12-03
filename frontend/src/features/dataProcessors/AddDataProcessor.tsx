import { useState } from "react";
import type { FormEvent } from "react";
import {Button} from '../../shared/components/Buttons.tsx'

export default function AddDataProcessor() {
    const [name, setName] = useState("");
    const [hostingCountry, setHostingCountry] = useState("");
    const [dpaCount, setDpaCount] = useState("");   // <-- STRING i UI

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newProcessor = {
            name,
            hostingCountry,
            dpaCount: Number(dpaCount),   // <-- KONVERTER HER
        };

        console.log("New Data Processor:", newProcessor);

        alert("Data Processor added successfully! (mock)");
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
                        Hosting Country
                    </label>
                    <input
                        type="text"
                        value={hostingCountry}
                        onChange={(e) => setHostingCountry(e.target.value)}
                        placeholder="e.g. Germany"
                        required
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* DPA Count */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Number of DPAs
                    </label>
                    <input
                        type="number"
                        value={dpaCount}
                        onChange={(e) => setDpaCount(e.target.value)}  // <-- BLIVER STRING
                        required
                        min={0}
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Submit */}
            <Button to="/dashboard" variant="primary">Add Data Processor</Button>
            </form>
        </div>
    );
}
