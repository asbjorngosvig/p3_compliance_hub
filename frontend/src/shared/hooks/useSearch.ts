import { useState, useMemo } from "react";

interface UseSearchOptions<T> {
    data: T[];
    searchKeys: (keyof T)[];
}

interface UseSearchReturn<T> {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filteredData: T[];
}

export function useSearch<T>({ data, searchKeys }: UseSearchOptions<T>): UseSearchReturn<T> {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = useMemo(() => {
        if (!searchTerm.trim()) return data;

        const term = searchTerm.toLowerCase();
        return data.filter((item) =>
            searchKeys.some((key) => {
                const value = item[key];
                return String(value).toLowerCase().includes(term);
            })
        );
    }, [data, searchTerm, searchKeys]);

    return { searchTerm, setSearchTerm, filteredData };
}