import { instance } from "./axiosClient";
import type {IDPA} from "../types/dpa.types";

export interface GetAllDPAsResponse {
    dpas: IDPA[];
    totalCount: number;
}

export const dpaService = {
    async getAll(): Promise<GetAllDPAsResponse> {
        const response = await instance.get<GetAllDPAsResponse>("/dpa/");
        return response.data;
    },

    async create(data: {
        requirements: any[];
        communicationStrategies: any[];
        customerName: string;
        productName: string;
        fileUrl: string;
    }): Promise<{ createdDPA: IDPA }> {
        const response = await instance.post("/dpa/", data);
        return response.data;
    },

    async delete(id: string): Promise<void> {
        await instance.delete(`/dpa/${id}`);
    },
};