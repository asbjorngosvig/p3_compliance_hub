import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import { dataProcessorService } from "../../shared/services/DataProcessorService";
import { locationService } from "../../shared/services/LocationService";




export default function AddDataProcessor() {
    const [processingLocations, setProcessingLocations] = useState<string[]>([]); // chosen processing locations

    const [fetchedLocations, setFetchedLocations] = useState<string[]>([]); // List of locations from backend

    const [name, setName] = useState("");
    const [location, setLocation] = useState(""); // Input holder for location
    const [purpose, setPurpose] = useState("");
    const [service, setService] = useState("");
    const [website, setWebsite] = useState("");
    const [note, setNote] = useState("");

    const navigate = useNavigate();

    const handleCreate = async () => {
        try {
            await dataProcessorService.create({
                name,
                processingLocations,
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

    // Fetches processing locations based on what the user has written so far. Is called by the 'onchange' input.
    const fetchLocationsList = async (location: String) => {
        try {
            let res = await locationService.get("/"+location);
            setFetchedLocations(Array.from(res.data));
        } catch (err) {
            alert("Error getting locations");
        }
    }

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
