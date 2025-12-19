import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dataProcessorService } from "../../shared/services/DataProcessorService.ts";
import { useConfirm } from "../../shared/components/ConfirmDialog.tsx";
import { useDataFetching } from "../../shared/hooks/useDataFetching";
import { useFormSubmit } from "../../shared/hooks/useFormSubmit";
import { useLocationAutocomplete } from "../../shared/hooks/useLocationAutocomplete";
import FormInput from "../../shared/components/form/FormInput.tsx";
import FormContainer from "../../shared/components/form/FormContainer.tsx";
import LocationAutocompleteInput from "../../shared/components/form/LocationAutocompleteInput.tsx";
import LoadingState from "../../shared/components/ui/LoadingState.tsx";

export default function EditDataProcessor() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const confirm = useConfirm();

    // Fetch existing data processor
    const { data: dp, loading } = useDataFetching({
        fetchFn: async () => {
            if (!id) throw new Error("Missing data processor id");
            const response = await dataProcessorService.getById(id);
            return response.data;
        },
        dependencies: [id]
    });

    // Form state
    const [name, setName] = useState("");
    const [service, setService] = useState("");
    const [purpose, setPurpose] = useState("");
    const [note, setNote] = useState("");
    const [website, setWebsite] = useState("");

    // Location autocomplete hook
    const {
        selectedLocations: processingLocations,
        setSelectedLocations: setProcessingLocations,
        locationInput,
        setLocationInput,
        fetchedLocations,
        locationError,
        handleLocationRemove,
        handleEnterKey,
        fetchLocationsList
    } = useLocationAutocomplete();

    // Update form fields when data loads
    useEffect(() => {
        if (dp) {
            setName(dp.name);
            setService(dp.service);
            setPurpose(dp.purpose);
            setNote(dp.note || "");
            setWebsite(dp.website || "");
            setProcessingLocations(dp.processingLocations || []);
        }
    }, [dp, setProcessingLocations]);

    // Form submission
    const { isSubmitting, error, handleSubmit: submitForm } = useFormSubmit({
        onSubmit: async () => {
            if (!id) throw new Error("Missing data processor id");

            if (processingLocations.length === 0) {
                throw new Error("Please select at least one processing location.");
            }

            await dataProcessorService.update(id, {
                name,
                service,
                purpose,
                note,
                website,
                processingLocations,
            });

            await confirm({
                title: "Success!",
                message: "Data processor updated successfully.",
                confirmText: "OK",
                type: "success",
            });
        },
        onSuccess: () => navigate(`/dataprocessors/${id}`)
    });

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <LoadingState message="Loading..." />
            </div>
        );
    }

    return (
        <FormContainer
            title="Edit Data Processor"
            onSubmit={(e) => {
                e.preventDefault();
                submitForm({});
            }}
            isSubmitting={isSubmitting}
            error={error}
            submitButtonText="Update Data Processor"
        >
            <FormInput
                id="name"
                label="Processor Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. AWS Frankfurt"
                required
            />

            <LocationAutocompleteInput
                label="Processing Locations"
                locationInput={locationInput}
                setLocationInput={setLocationInput}
                fetchedLocations={fetchedLocations}
                selectedLocations={processingLocations}
                locationError={locationError}
                onLocationRemove={handleLocationRemove}
                onKeyDown={handleEnterKey}
                fetchLocationsList={fetchLocationsList}
            />

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
            />

            <FormInput
                id="website"
                label="Website"
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="e.g. https://www.example.com"
            />
        </FormContainer>
    );
}