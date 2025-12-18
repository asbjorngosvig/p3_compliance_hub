import type { ReactNode, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "../Buttons";
import Loader from "../Loader";
import ErrorMessage from "../ui/ErrorMessage.tsx";

interface FormContainerProps {
    title: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    isSubmitting: boolean;
    error?: string | null;
    submitButtonText: string;
    children: ReactNode;
    showBackButton?: boolean;
    onBack?: () => void;
}

export default function FormContainer({
                                          title,
                                          onSubmit,
                                          isSubmitting,
                                          error,
                                          submitButtonText,
                                          children,
                                          showBackButton = true,
                                          onBack
                                      }: FormContainerProps) {
    const navigate = useNavigate();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    return (
        <div className="px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>

            <form
                onSubmit={onSubmit}
                className="mt-6 max-w-xl space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow"
            >
                {error && <ErrorMessage message={error} />}

                {children}

                {/* Bottom buttons */}
                <div className="mt-6 flex justify-between">
                    {showBackButton && (
                        <Button
                            type="button"
                            variant="tertiary"
                            onClick={handleBack}
                            disabled={isSubmitting}
                            className="inline-flex items-center"
                        >
                            <ArrowLeftIcon className="mr-1 h-4 w-4" />
                            Back
                        </Button>
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting}
                        className="ml-auto"
                    >
                        {isSubmitting ? <Loader /> : submitButtonText}
                    </Button>
                </div>
            </form>
        </div>
    );
}