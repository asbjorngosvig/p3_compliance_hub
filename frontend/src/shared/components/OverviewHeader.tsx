import {OverviewCards} from "./OverviewCards.tsx";
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export function OverviewHeader() {
    const cardsData = [
        {
            title : "Violations",
            description : "Detected:",
            numberCount : 5,
            violationStatus : true,
            priority : "Priority: Urgent",

        },
        {
            title : "Compliant",
            description : "Compliant DPAs: ",
            numberCount : 27,
            violationStatus : false
        },
        {
            title : "Pending",
            description : "Awaited response: ",
            numberCount : 2,
            violationStatus : false
        },
        {

            title : "To be contacted",
            description : "30 days to contact: ",
            numberCount : 5,
            violationStatus : false
        }
    ];


    return (
        <>
            <div className={"  bg-slate-50 p-5 border rounded-2xl lg:text-left sm:text-center "}>

                <p className={" text-black text-2xl font-semibold pb-4 "}>Overview</p>
                <OverviewCards cards={cardsData}/>
            </div>


        </>
    )
}

export default OverviewHeader;