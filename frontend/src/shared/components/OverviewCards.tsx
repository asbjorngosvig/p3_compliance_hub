import {OverviewCard} from './OverviewCard.tsx';
import type {priorityStatus} from "./OverviewCard.tsx";

interface OverviewCardsProps {
    cards: {
        title: string;
        description: string;
        numberCount: number;
        violationStatus: boolean;
        priority?: priorityStatus;
    }[];
}

export function OverviewCards({cards}: OverviewCardsProps ) {

    return (
        <>
            {/*<div className="truncate flex wrap-normal whitespace-normal p-1">*/}
            <div className=" grid gap-4 sm:grid-cols-2 lg:grid-cols-4  justify-center text-left ">
                {cards.map((card, index) => (
                        <OverviewCard key={index} {...card}></OverviewCard>
                    )
                )}
            </div>
        </>
    );
}


export default OverviewCards;