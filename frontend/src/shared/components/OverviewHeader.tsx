import { OverviewCards } from "./OverviewCards.tsx";
import type { priorityStatus } from "./OverviewCard.tsx";
import { Button } from "./Buttons.tsx";
import {
    ExclamationTriangleIcon,
    CheckCircleIcon,
    FolderIcon,
    EnvelopeIcon,
} from "@heroicons/react/24/outline";

export type OverviewHeaderProps = {
    totalDpas: number;
    violationsCount: number;
    compliantCount: number;
    toBeContactedCount: number;
    highestPriorityForViolations?: priorityStatus; // optional, you don't have to pass it
};

export function OverviewHeader({
    totalDpas,
    violationsCount,
    compliantCount,
    toBeContactedCount,
    highestPriorityForViolations = "Urgent",
}: OverviewHeaderProps) {
    const cardsData: {
        title: string;
        description: string;
        numberCount: number;
        violationStatus: boolean;
        priority?: priorityStatus;
        Icon: React.ElementType;
    }[] = [
        {
            title: "Violations",
            description: "Detected violations: ",
            numberCount: violationsCount,
            violationStatus: violationsCount > 0,
            priority: violationsCount > 0 ? highestPriorityForViolations : undefined,
            Icon: ExclamationTriangleIcon,
        },
        {
            title: "Compliant",
            description: "Compliant DPAs: ",
            numberCount: compliantCount,
            violationStatus: false,
            Icon: CheckCircleIcon,
        },
        {
            title: "Total DPA's",
            description: "Total DPA's: ",
            numberCount: totalDpas,
            violationStatus: false,
            Icon: FolderIcon,
        },
        {
            title: "To be contacted",
            description: "Waiting to be contacted: ",
            numberCount: toBeContactedCount,
            violationStatus: false,
            Icon: EnvelopeIcon,
        },
    ];

    return (
        <div className="shadow-sm bg-white p-4 rounded-2xl">
            <div className="rounded-2xl w-full">
                <div className="flex items-center justify-between pb-4">
                    <p className="text-slate-700 text-4xl font-semibold">Overview</p>
                    <Button to="/adddpa" variant="primary">
                        Add DPA
                    </Button>
                </div>

                <OverviewCards cards={cardsData} />
            </div>
        </div>
    );
}

export default OverviewHeader;
