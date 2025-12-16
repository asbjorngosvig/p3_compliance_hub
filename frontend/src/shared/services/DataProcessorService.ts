import { instance } from "./axiosClient";
import type {
    IDataProcessor,
    IDataProcessorGetAllResponse,
    IDataProcessorCreateResponse,
} from "../types/IDataProcessor";

const update = (id: string, data: Partial<IDataProcessor>) => {
    return instance.put<IDataProcessorCreateResponse>(`/dataprocessors/${id}`, data);
};

const create = (data: IDataProcessor) => {
    return instance.post<IDataProcessorCreateResponse>("/dataprocessors", data);
};

const getAll = () => {
    return instance.get<IDataProcessorGetAllResponse>("/dataprocessors");
};

const getById = (id: string) => {
    return instance.get<IDataProcessor>(`/dataprocessors/${id}`);
};

const deleteById = (id: string) => {
    return instance.delete(`/dataprocessors/${id}`);
};

export const dataProcessorService = {
    update,
    create,
    getAll,
    getById,
    deleteById,
};
