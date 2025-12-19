import { useState } from "react";
import { useConfirm } from "../components/ConfirmDialog";

interface UseDeleteWithConfirmOptions<T> {
    onDelete: (id: string) => Promise<void>;
    getItemName: (item: T) => string;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

interface UseDeleteWithConfirmReturn<T> {
    isDeleting: boolean;
    error: string | null;
    handleDelete: (item: T, id: string) => Promise<void>;
}

export function useDeleteWithConfirm<T>({
                                            onDelete,
                                            getItemName,
                                            onSuccess,
                                            onError
                                        }: UseDeleteWithConfirmOptions<T>): UseDeleteWithConfirmReturn<T> {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const confirm = useConfirm();

    const handleDelete = async (item: T, id: string) => {
        const itemName = getItemName(item);

        const confirmed = await confirm({
            title: "Delete Item",
            message: `Are you sure you want to delete "${itemName}"? This action cannot be undone.`,
            confirmText: "Delete",
            cancelText: "Cancel",
            type: "danger"
        });

        if (!confirmed) return;

        try {
            setIsDeleting(true);
            setError(null);
            await onDelete(id);
            onSuccess?.();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to delete item";
            console.error("Delete error:", err);
            setError(errorMessage);
            onError?.(err as Error);
        } finally {
            setIsDeleting(false);
        }
    };

    return { isDeleting, error, handleDelete };
}