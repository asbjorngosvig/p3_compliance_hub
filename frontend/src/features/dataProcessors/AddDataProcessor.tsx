import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import { dataProcessorService } from "../../shared/services/DataProcessorService";

export default function AddDataProcessor() {
    const [name, setName] = useState("");
    const [processingLocations, setProcessingLocations] = useState<string[]>([]);

    const [location, setLocation] = useState("");
    const [purpose, setPurpose] = useState("");
    const [service, setService] = useState("");
    const [website, setWebsite] = useState("");
    const [note, setNote] = useState("");

    const navigate = useNavigate();


    const handleCreate = async () => {
        try {
            await dataProcessorService.create({
                name,
                processing_locations: processingLocations,
                service,
                purpose,
                note,
                website,
            });

            alert("Data Processor successfully created");

            // reset all fields
            setName("");
            setProcessingLocations([]);
            setLocation("");
            setPurpose("");
            setService("");
            setWebsite("");
            setNote("");
        } catch (err) {
            console.error(err);
            alert("Error adding data processor");
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleCreate();
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
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (location.trim().length > 0) {
                    setProcessingLocations((prev) => [...prev, location]);
                    setLocation(""); // clear input
                  }
                }
              }}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Purpose */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Purpose</label>
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
            <label className="text-sm font-medium text-gray-700">Service</label>
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
            <label className="text-sm font-medium text-gray-700">Note</label>
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
            <label className="text-sm font-medium text-gray-700">Website</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="e.g. https://www.example.com"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Bottom buttons: Back + Submit */}
          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              <ArrowLeftIcon className="mr-1 h-4 w-4" />
              Back
            </button>

            <button
              type="submit"
              className="rounded-lg bg-[#7BA043] px-6 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110"
            >
              Add Data Processor
            </button>
          </div>
        </form>
      </div>
    );
}
