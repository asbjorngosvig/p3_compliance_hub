import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { dataProcessorService } from "../../shared/services/DataProcessorService";
import { useConfirm } from "../../shared/components/ConfirmDialog.tsx";
import Loader from "../../shared/components/Loader.tsx";
import { useFormSubmit } from "../../shared/hooks/useFormSubmit";
import { useLocationAutocomplete } from "../../shared/hooks/useLocationAutocomplete";
import FormInput from "../../shared/components/FormInput";
import ErrorMessage from "../../shared/components/ui/ErrorMessage.tsx";
import LocationTag from "../../shared/components/ui/LocationTag.tsx";

export default function AddDataProcessor() {
    const navigate = useNavigate();
    const confirm = useConfirm();

    // Form state
    const [name, setName] = useState("");
    const [service, setService] = useState("");
    const [purpose, setPurpose] = useState("");
    const [note, setNote] = useState("");
    const [website, setWebsite] = useState("");

    // Location autocomplete hook
    const {
        selectedLocations: processingLocations,
        locationInput,
        setLocationInput,
        fetchedLocations,
        locationError,
        handleLocationRemove,
        handleEnterKey,
        fetchLocationsList,
    } = useLocationAutocomplete();

    // Form submission hook
    const { isSubmitting, error, handleSubmit: submitForm } = useFormSubmit({
        onSubmit: async () => {
            if (processingLocations.length === 0) {
                throw new Error("Please select at least one processing location.");
            }

            await dataProcessorService.create({
                name,
                processingLocations,
                service,
                purpose,
                note,
                website,
            });

            await confirm({
                title: "Success!",
                message: "The Data Processor was created successfully.",
                confirmText: "OK",
                type: "success"
            });
        },
        onSuccess: () => navigate(-1)
    });

    return (
        <div className="px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900">Add Data Processor</h1>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    submitForm({});
                }}
                className="mt-6 max-w-xl space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow"
            >
                {error && <ErrorMessage message={error} />}

                <FormInput
                    id="name"
                    label="Processor Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. AWS Frankfurt"
                    required
                />

                {/* Processing Locations */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                        Processing Locations Country
                    </label>
                    <input
                        type="text"
                        list="processingLocations"
                        value={locationInput}
                        onChange={(e) => {
                            setLocationInput(e.target.value);
                            fetchLocationsList(e.target.value);
                        }}
                        onClick={() => fetchLocationsList("")}
                        onKeyDown={handleEnterKey}
                        placeholder="Type to search locations..."
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <datalist id="processingLocations">
                        {fetchedLocations.map((loc, i) => (
                            <option key={i} value={loc} />
                        ))}
                    </datalist>

                    {locationError && <p className="text-xs text-red-600">{locationError}</p>}

                    {processingLocations.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {processingLocations.map((loc, index) => (
                                <LocationTag
                                    key={index}
                                    location={loc}
                                    onRemove={() => handleLocationRemove(loc)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <FormInput
                    id="purpose"
                    label="Purpose"
                    type="text"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="e.g. Hosting database"
                    required
                />

                <FormInput
                    id="service"
                    label="Service"
                    type="text"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    placeholder="e.g. Cloud infrastructure (IaaS)"
                    required
                />

                <FormInput
                    id="note"
                    label="Note"
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="e.g. DPA signed 2024-05-01"
                    required
                />

                <FormInput
                    id="website"
                    label="Website"
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="e.g. https://www.example.com"
                    required
                />

                {/* Bottom buttons */}
                <div className="mt-6 flex justify-between">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        disabled={isSubmitting}
                        className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                    >
                        <ArrowLeftIcon className="mr-1 h-4 w-4" />
                        Back
                    </button>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-lg bg-[#7BA043] px-6 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110 disabled:opacity-50"
                    >
                        {isSubmitting ? <Loader /> : "Add Data Processor"}
                    </button>
                </div>
            </form>
        </div>
    );
}