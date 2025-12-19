import LocationTag from "../ui/LocationTag.tsx";

interface LocationAutocompleteInputProps {
    label: string;
    locationInput: string;
    setLocationInput: (value: string) => void;
    fetchedLocations: string[];
    selectedLocations: string[];
    locationError: string | null;
    onLocationRemove: (location: string) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    fetchLocationsList: (query: string) => Promise<void>;
    placeholder?: string;
    required?: boolean;
}

export default function LocationAutocompleteInput({
                                                      label,
                                                      locationInput,
                                                      setLocationInput,
                                                      fetchedLocations,
                                                      selectedLocations,
                                                      locationError,
                                                      onLocationRemove,
                                                      onKeyDown,
                                                      fetchLocationsList,
                                                      placeholder = "Type to search locations...",
                                                      required = false
                                                  }: LocationAutocompleteInputProps) {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500"> *</span>}
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
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <datalist id="processingLocations">
                {fetchedLocations.map((loc, i) => (
                    <option key={i} value={loc} />
                ))}
            </datalist>

            {locationError && <p className="text-xs text-red-600">{locationError}</p>}

            {selectedLocations.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {selectedLocations.map((loc, index) => (
                        <LocationTag
                            key={index}
                            location={loc}
                            onRemove={() => onLocationRemove(loc)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}