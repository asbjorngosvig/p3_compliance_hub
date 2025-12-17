import { useState, useEffect } from "react";

interface UseDataFetchingOptions<T> {
    fetchFn: () => Promise<T>;
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    dependencies?: any[];
}

interface UseDataFetchingReturn<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export function useDataFetching<T>({
                                       fetchFn,
                                       onSuccess,
                                       onError,
                                       dependencies = []
                                   }: UseDataFetchingOptions<T>): UseDataFetchingReturn<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await fetchFn();
            setData(result);
            onSuccess?.(result);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to fetch data";
            console.error("Fetch error:", err);
            setError(errorMessage);
            onError?.(err as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, dependencies);

    return { data, loading, error, refetch: fetchData };
}