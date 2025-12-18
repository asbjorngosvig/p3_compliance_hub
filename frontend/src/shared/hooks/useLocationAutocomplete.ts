import { useState } from "react";
import { locationsService } from "../services/LocationsService";

interface UseLocationAutocompleteOptions {
    initialLocations?: string[];
}

interface UseLocationAutocompleteReturn {
    selectedLocations: string[];
    setSelectedLocations: (locations: string[] | ((prev: string[]) => string[])) => void;
    locationInput: string;
    setLocationInput: (value: string) => void;
    fetchedLocations: string[];
    locationError: string | null;
    handleLocationSelect: (location: string) => void;
    handleLocationRemove: (location: string) => void;
    handleEnterKey: (e: React.KeyboardEvent) => void;
    fetchLocationsList: (query: string) => Promise<void>;
    setLocationError: (error: string | null) => void;
}

export function useLocationAutocomplete(
    options: UseLocationAutocompleteOptions = {}
): UseLocationAutocompleteReturn {
    const { initialLocations = [] } = options;

    const [selectedLocations, setSelectedLocations] = useState<string[]>(initialLocations);
    const [locationInput, setLocationInput] = useState("");
    const [fetchedLocations, setFetchedLocations] = useState<string[]>([]);
    const [locationError, setLocationError] = useState<string | null>(null);

    const fetchLocationsList = async (query: string) => {
        try {
            const res = await locationsService.get("/" + query);
            setFetchedLocations(Array.from(res.data));
        } catch {
            setFetchedLocations([]);
        }
    };

    const handleLocationSelect = (location: string) => {
        setLocationError(null);

        if (selectedLocations.includes(location)) {
            setLocationError("Location already selected.");
            return;
        }

        setSelectedLocations(prev => [...prev, location]);
        setLocationInput("");
    };

    const handleLocationRemove = (location: string) => {
        setSelectedLocations(prev => prev.filter(loc => loc !== location));
    };

    const handleEnterKey = (e: React.KeyboardEvent) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        setLocationError(null);

        if (fetchedLocations.length === 0) {
            setLocationError("No such location found.");
            return;
        }

        handleLocationSelect(fetchedLocations[0]);
    };

    return {
        selectedLocations,
        setSelectedLocations,
        locationInput,
        setLocationInput,
        fetchedLocations,
        locationError,
        handleLocationSelect,
        handleLocationRemove,
        handleEnterKey,
        fetchLocationsList,
        setLocationError
    };
}