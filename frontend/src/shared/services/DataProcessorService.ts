import api from "../api/api";
import type {
    IDataProcessor,
    IDataProcessorGetAllResponse,
    IDataProcessorCreateResponse,
} from "../types/IDataProcessor";

const update = (id: string, data: Partial<IDataProcessor>) => {
    return api.put<IDataProcessorCreateResponse>(`/dataprocessors/${id}`, data);
};

const create = (data: IDataProcessor) => {
    return api.post<IDataProcessorCreateResponse>("api/dataprocessors", data);
};

const getAll = () => {
    return api.get<IDataProcessorGetAllResponse>("api/dataprocessors");
};

const getById = (id: string) => {
    return api.get<IDataProcessor>(`api/dataprocessors/${id}`);
};

const deleteById = (id: string) => {
    return api.delete(`api/dataprocessors/${id}`);
};

export const dataProcessorService = {
    update,
    create,
    getAll,
    getById,
    deleteById,
};
