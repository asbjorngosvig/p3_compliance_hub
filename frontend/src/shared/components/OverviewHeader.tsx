import {OverviewCards} from './OverviewCards.tsx';
import type {priorityStatus} from './OverviewCard.tsx';
import {Button} from './Buttons.tsx'
import {
    ExclamationTriangleIcon,
    CheckCircleIcon,
    FolderIcon,
    EnvelopeIcon
} from "@heroicons/react/24/outline";



export function OverviewHeader() {
    const cardsData: {
        title: string;
        description: string;
        numberCount: number;
        violationStatus: boolean;
        priority?: priorityStatus;
        Icon: React.ElementType;
    }[] = [
        { title: "Violations", description: "Detected:", numberCount: 5, violationStatus: false, priority: "Urgent", Icon: ExclamationTriangleIcon },
        { title: "Compliant", description: "Compliant DPAs:", numberCount: 27, violationStatus: false, Icon: CheckCircleIcon },
        { title: "Total DPA's", description: "Amount:", numberCount: 20, violationStatus: false, Icon:  FolderIcon},
        { title: "To be contacted", description: "30 days to contact:", numberCount: 5, violationStatus: false, Icon: EnvelopeIcon },
    ];

    return (
        <div className="shadow-sm bg-white p-4 rounded-2xl">
        <div className="  rounded-2xl w-full">
            <div className="flex items-center justify-between pb-4">
                <p className="text-slate-700 text-4xl font-semibold">Overview</p>
                <Button to="/adddpa" variant="primary">Add DPA</Button>
            </div>

            <OverviewCards cards={cardsData} />
        </div>
        </div>
    );
}

export default OverviewHeader;