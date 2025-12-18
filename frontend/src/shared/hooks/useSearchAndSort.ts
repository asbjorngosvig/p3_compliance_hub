import { useState, useMemo } from "react";

type SortDirection = "asc" | "desc";

interface SortState<K> {
    key: K;
    direction: SortDirection;
}

interface UseSearchAndSortOptions<T, K extends keyof T> {
    data: T[];
    searchKeys: K[];
    initialSortKey: K;
    initialSortDirection?: SortDirection;
}

interface UseSearchAndSortReturn<T, K extends keyof T> {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    sortState: SortState<K>;
    setSortState: (state: SortState<K>) => void;
    processedData: T[];
    toggleSort: (key: K) => void;
}

export function useSearchAndSort<T, K extends keyof T>({
                                                           data,
                                                           searchKeys,
                                                           initialSortKey,
                                                           initialSortDirection = "asc"
                                                       }: UseSearchAndSortOptions<T, K>): UseSearchAndSortReturn<T, K> {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortState, setSortState] = useState<SortState<K>>({
        key: initialSortKey,
        direction: initialSortDirection
    });

    const processedData = useMemo(() => {
        let result = data;

        // Apply search filter
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            result = result.filter((item) =>
                searchKeys.some((key) => {
                    const value = item[key];
                    return String(value).toLowerCase().includes(term);
                })
            );
        }

        // Apply sorting
        const sorted = [...result].sort((a, b) => {
            const aVal = String(a[sortState.key] ?? "");
            const bVal = String(b[sortState.key] ?? "");
            const cmp = aVal.localeCompare(bVal, "en", { sensitivity: "base" });
            return sortState.direction === "asc" ? cmp : -cmp;
        });

        return sorted;
    }, [data, searchTerm, searchKeys, sortState]);

    const toggleSort = (key: K) => {
        setSortState(prev => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
        }));
    };

    return {
        searchTerm,
        setSearchTerm,
        sortState,
        setSortState,
        processedData,
        toggleSort
    };
}