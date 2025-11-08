import {OverviewCards} from "./OverviewCards.tsx";

export function OverviewHeaderComponent() {

    return (
        <>
            <div className={"justify-items-start bg-slate-50 p-5 border rounded-2xl"}>
                <p className={" text-black text-2xl font-semibold pb-4"}>Overview</p>

                <OverviewCards></OverviewCards>
            </div>


        </>
    )
}

export default OverviewHeaderComponent;