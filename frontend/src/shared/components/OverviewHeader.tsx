import {OverviewCards} from './OverviewCards.tsx';
import type {priorityStatus} from './OverviewCard.tsx';
import {Button} from './Buttons.tsx'


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
        <div className="bg-slate-50 p-5 border rounded-2xl w-full ">
            <div className="flex items-center justify-between pb-4">
                <p className="text-black text-2xl font-semibold">Overview</p>
                <Button to="/adddpa" variant="primary">Add DPA</Button>
            </div>

            <OverviewCards cards={cardsData} />
        </div>
    );
}

export default OverviewHeader;