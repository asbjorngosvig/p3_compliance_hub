import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { dpaService } from "../../shared/services/dpaService";
import type { CreateDPARequest } from "../../shared/types/dpa.types";
import { useConfirm } from "../../shared/components/ConfirmDialog.tsx";
import { useFormSubmit } from "../../shared/hooks/useFormSubmit";
import { useLocationAutocomplete } from "../../shared/hooks/useLocationAutocomplete";
import FormInput from "../../shared/components/form/FormInput.tsx";
import FormContainer from "../../shared/components/form/FormContainer.tsx";
import LocationAutocompleteInput from "../../shared/components/form/LocationAutocompleteInput.tsx";

export default function Dpaform() {
    const navigate = useNavigate();
    const confirm = useConfirm();

    // Form state
    const [customerName, setCustomerName] = useState("");
    const [productName, setProductName] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const [needWrittenApproval, setNeedWrittenApproval] = useState(false);
    const [daysOfNotice, setDaysOfNotice] = useState<string>("");
    const [showDaysInfo, setShowDaysInfo] = useState(false);

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

            if (daysOfNotice === "" || Number(daysOfNotice) < 0) {
                throw new Error("Days of notice is required and must be a non-negative number.");
            }

            const requestData: CreateDPARequest = {
                allowedProcessingLocations: processingLocations,
                needWrittenApproval,
                daysOfNotice: Number(daysOfNotice),
                customerName,
                productName,
                fileUrl,
            };

            await dpaService.create(requestData);

            await confirm({
                title: "Success!",
                message: "The DPA was created successfully.",
                confirmText: "OK",
                type: "success"
            });
        },
        onSuccess: () => navigate(-1)
    });

    return (
        <FormContainer
            title="Add New DPA"
            onSubmit={(e) => {
                e.preventDefault();
                submitForm({});
            }}
            isSubmitting={isSubmitting}
            error={error}
            submitButtonText="Add DPA"
        >
            <FormInput
                id="customerName"
                label="Customer Name"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. AAU"
                required
            />

            <FormInput
                id="productName"
                label="Type of Service"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Exam Management Platform"
                required
            />

            <FormInput
                id="fileUrl"
                label="DPA Document URL"
                type="url"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="e.g. https://www.example.com/dpa.pdf"
                required
            />

            <LocationAutocompleteInput
                label="Allowed Processing Locations"
                locationInput={locationInput}
                setLocationInput={setLocationInput}
                fetchedLocations={fetchedLocations}
                selectedLocations={processingLocations}
                locationError={locationError}
                onLocationRemove={handleLocationRemove}
                onKeyDown={handleEnterKey}
                fetchLocationsList={fetchLocationsList}
            />

            {/* Days of Notice with tooltip */}
            <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    Days of Notice
                    <InformationCircleIcon
                        className="h-4 w-4 text-slate-400 cursor-pointer"
                        onMouseEnter={() => setShowDaysInfo(true)}
                        onMouseLeave={() => setShowDaysInfo(false)}
                    />
                </label>

                {showDaysInfo && (
                    <p className="mt-1 w-full max-w-sm rounded-lg bg-slate-50 border border-slate-200 px-3 py-2 text-xs text-slate-700 shadow-sm">
                        The timeframe within which the customer must be notified in the event of a DPA violation
                    </p>
                )}

                <input
                    type="number"
                    min="0"
                    value={daysOfNotice}
                    onChange={(e) => {
                        const v = e.target.value;
                        if (v === "") {
                            setDaysOfNotice("");
                            return;
                        }
                        if (/^\d+$/.test(v)) {
                            setDaysOfNotice(v);
                        }
                    }}
                    placeholder="e.g. 30"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
            </div>

            {/* Approval checkbox */}
            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={needWrittenApproval}
                    onChange={(e) => setNeedWrittenApproval(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-[#7BA043] focus:ring-[#7BA043]"
                />
                <span className="text-sm font-medium text-slate-700">
                    Requires written approval before data processor changes
                </span>
            </div>
        </FormContainer>
    );
}