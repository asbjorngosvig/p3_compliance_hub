import api from "../api/api";
import type {
    IDataProcessor,
    IDataProcessorGetAllResponse,
    IDataProcessorCreateResponse,
} from "../types/IDataProcessor";

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
    create,
    getAll,
    getById,
    deleteById,
};
