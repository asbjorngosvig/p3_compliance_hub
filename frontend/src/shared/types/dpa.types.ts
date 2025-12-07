// src/types/dpa.types.ts
export type DpaStatus = "Compliant" | "Violation" | "Pending";
export type DpaPriority = "None" | "Urgent" | "Important";
export type DpaAction = "None" | "Terminate" | "Contact";

export interface IViolation {
    id: string;
    description: string;
    severity: string;
}

export interface IRequirement {
    id: string;
    reqEvaluator: string;
    attributes: Record<string, any>;
}

export interface ICommunicationStrategy {
    id: string;
    strategyType: string;
    details: string;
}

export interface IDPA {
    id: string;
    violations: IViolation[];
    requirements: IRequirement[];
    communicationStrats: ICommunicationStrategy[];
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
    action: DpaAction;
    timeframe: string;
}