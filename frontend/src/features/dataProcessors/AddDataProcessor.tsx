import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataProcessorService } from "../../shared/services/DataProcessorService";
import { useConfirm } from "../../shared/components/ConfirmDialog.tsx";
import { useFormSubmit } from "../../shared/hooks/useFormSubmit";
import { useLocationAutocomplete } from "../../shared/hooks/useLocationAutocomplete";
import FormInput from "../../shared/components/form/FormInput.tsx";
import FormContainer from "../../shared/components/form/FormContainer.tsx";
import LocationAutocompleteInput from "../../shared/components/form/LocationAutocompleteInput.tsx";

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
        <FormContainer
            title="Add Data Processor"
            onSubmit={(e) => {
                e.preventDefault();
                submitForm({});
            }}
            isSubmitting={isSubmitting}
            error={error}
            submitButtonText="Add Data Processor"
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
                label="Processing Locations Country"
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
        </FormContainer>
    );
}