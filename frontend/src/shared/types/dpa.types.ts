// src/types/dpa.types.ts
export type DpaStatus = "Compliant" | "Violation" | "Pending";
export type DpaPriority = "None" | "Urgent" | "Important";
export type DpaAction = "None" | "Terminate" | "Contact";

export interface IAction {
    id: string;
    description: string;
}

export interface IViolation {
    id: string;
    description: string;
    actions: IAction[];

}

export interface IRequirement {
    id?: string;
    reqEvaluator: string;
    attributes: Record<string, any>;
}

export interface ICommunicationStrategy {
    id?: string;
    strategyType: string;
    attributes: Record<string, any>;
}

export interface IDPA {
    id: string;
    violations: IViolation[];
    communicationStrats?: ICommunicationStrategy[];
    customerName: string;
    productName: string;
    createdDate: string;
    fileUrl: string;
}

export interface DpaRow {
    id: string;
    name: string;
    status: DpaStatus;
    priority: DpaPriority;
    action: string;
    timeframe: string;
}

// Request payload for creating a DPA
export interface CreateDPARequest {
    allowedProcessingLocations: string[];
    needWrittenApproval: boolean;
    daysOfNotice: number;
    customerName: string;
    productName: string;
    fileUrl: string;
}