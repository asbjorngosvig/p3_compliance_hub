import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { locationsService } from "../../shared/services/LocationsService";

const Dpaform: React.FC = () => {
    const navigate = useNavigate();
    const [processingLocations, setProcessingLocations] = useState<string[]>([]); // chosen processing locations

    const [fetchedLocations, setFetchedLocations] = useState<string[]>([]); // List of locations from backend

    const [location, setLocation] = useState(""); // Input holder for location


    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      // TODO: hook this up to your real submit logic later
      console.log("Add DPA form submitted");
    };

    // Fetches processing locations based on what the user has written so far. Is called by the 'onchange' input.
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
