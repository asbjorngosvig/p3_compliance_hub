import {OverviewCards} from './OverviewCards.tsx';
import type {priorityStatus} from './OverviewCard.tsx';

export function OverviewHeader() {
    const cardsData: {
        title: string;
        description: string;
        numberCount: number;
        violationStatus: boolean;
        priority?: priorityStatus;
    }[] = [
        { title: "Violations", description: "Detected:", numberCount: 5, violationStatus: true, priority: "Urgent" },
        { title: "Compliant", description: "Compliant DPAs:", numberCount: 27, violationStatus: false },
        { title: "Pending", description: "Awaited response:", numberCount: 2, violationStatus: false },
        { title: "To be contacted", description: "30 days to contact:", numberCount: 5, violationStatus: false },
    ];

    return (
        <div className="bg-slate-50 p-5 border rounded-2xl w-full">
            <p className="text-black text-2xl font-semibold pb-4">Overview</p>
            <OverviewCards cards={cardsData} />
        </div>
    );
}

export default OverviewHeader;