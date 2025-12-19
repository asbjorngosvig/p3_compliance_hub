import { useState } from "react";

interface UseFormSubmitOptions<T> {
    onSubmit: (data: T) => Promise<void>;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

interface UseFormSubmitReturn {
    isSubmitting: boolean;
    error: string | null;
    handleSubmit: (data: any) => Promise<void>;
    clearError: () => void;
}

export function useFormSubmit<T = any>({
                                           onSubmit,
                                           onSuccess,
                                           onError
                                       }: UseFormSubmitOptions<T>): UseFormSubmitReturn {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (data: T) => {
        setError(null);
        setIsSubmitting(true);

        try {
            await onSubmit(data);
            onSuccess?.();
        } catch (err: any) {
            const errorMessage = err.response?.data?.message ||
                err.message ||
                "An error occurred. Please try again.";
            console.error("Form submission error:", err);
            setError(errorMessage);
            onError?.(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const clearError = () => setError(null);

    return { isSubmitting, error, handleSubmit, clearError };
}