import {OverviewCard} from './OverviewCard.tsx';
import type {priorityStatus} from "./OverviewCard.tsx";

interface OverviewCardsProps {
    cards: {
        title: string;
        description: string;
        numberCount: number;
        violationStatus: boolean;
        priority?: priorityStatus;
        Icon: React.ElementType;
    }[];
}

export function OverviewCards({cards}: OverviewCardsProps ) {
    return (
        <div className="w-full grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left">
            {cards.map((card, index) => (
                <OverviewCard key={index} {...card} />
            ))}
        </div>
    );
}

export default OverviewCards;