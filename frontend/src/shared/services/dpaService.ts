import { instance } from "./axiosClient";
import type { IDPA, CreateDPARequest } from "../types/dpa.types";

export interface GetAllDPAsResponse {
    dpas: IDPA[];
    totalCount: number;
}

export interface CreateDPAResponse {
    createdDPA: IDPA;
}

export const dpaService = {
    async getById(id: string): Promise<IDPA> {
        const response = await instance.get<IDPA>(`/dpa/${id}`);
        return response.data;
    },
    async getAll(): Promise<GetAllDPAsResponse> {
        const response = await instance.get<GetAllDPAsResponse>("/dpa/");
        return response.data;
    },

    async create(data: CreateDPARequest): Promise<CreateDPAResponse> {
        const response = await instance.post<CreateDPAResponse>("/dpa/", data);
        return response.data;
    },

    async delete(id: string): Promise<void> {
        await instance.delete(`/dpa/${id}`);
    },

};