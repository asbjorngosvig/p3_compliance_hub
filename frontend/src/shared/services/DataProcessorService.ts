import { instance } from "./axiosClient";
import type { IDataProcessor, IDataProcessorGetAllResponse, IDataProcessorCreateResponse } from "../types/IDataProcessor";

const create = (data: IDataProcessor) => {
    return instance.post<IDataProcessorCreateResponse>("/dataprocessors", data);
};


const getAll = () => {
    return instance.get<IDataProcessorGetAllResponse>("/dataprocessors");
};
const deleteById = (id: string) => {
    return instance.delete(`/dataprocessors/${id}`);
};

export const dataProcessorService = {
    create,
    getAll,
    deleteById
};
