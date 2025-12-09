import api from "../api/api";
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
        const response = await api.get<IDPA>(`api/dpa/${id}`);
        return response.data;
    },
    async getAll(): Promise<GetAllDPAsResponse> {
        const response = await api.get<GetAllDPAsResponse>("api/dpa/");
        return response.data;
    },

    async create(data: CreateDPARequest): Promise<CreateDPAResponse> {
        const response = await api.post<CreateDPAResponse>("api/dpa/", data);
        return response.data;
    },

    async delete(id: string): Promise<void> {
        await api.delete(`api/dpa/${id}`);
    },

};