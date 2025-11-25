import { instance } from "./axiosClient";
import type { IDataProcessor } from "../types/IDataProcessor";

const create = (data: IDataProcessor) => {
    return instance.post<IDataProcessor>("/dataprocessors/", {
        name: data.name,
        processingLocation: data.processingLocation,
        service: data.service,
        purpose: data.purpose,
        note: data.note,
        website: data.website
    });
};

const getAll = () => {
    return instance.get<IDataProcessor[]>("/dataprocessors");
};

const getById = (id: string) => {
    return instance.get<IDataProcessor>(`/dataprocessors/${id}`);
};

export const dataProcessorService = {
    create,
    getAll,
    getById
};
