export interface IDataProcessor {
    id?: string;
    name: string;
    processingLocations: string[];
    service: string;
    purpose: string;
    note: string;
    website: string;
}

export interface IDataProcessorGetAllResponse {
    allDataProcessors: IDataProcessor[];
    totalCount: number;
    sortedBy: string;
    order: string;
}

export interface IDataProcessorCreateResponse {
    createdDataProcessor: IDataProcessor;
}



