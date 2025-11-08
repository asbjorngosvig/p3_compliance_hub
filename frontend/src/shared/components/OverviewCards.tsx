import {OverviewCardComponent} from './OverviewCardComponent.tsx';


export function OverviewCards() {

    return (
        <>
            {/*<div className="flex wrap-normal whitespace-normal p-1">*/}
                <div className="flex flex-wrap gap-4 justify-center">
                <OverviewCardComponent title={"Violations"} description={"Detected:"}
                                       numberCount={5} violationStatus={true} priority={"Priority: Urgent"}
                ></OverviewCardComponent>


                <OverviewCardComponent title={"Compliant"} description={"Compliant DPAs: "}
                                       numberCount={27} violationStatus={false}
                ></OverviewCardComponent>


                <OverviewCardComponent title={"Pending"} description={"Awaited response: "}
                                       numberCount={2} violationStatus={false }
                ></OverviewCardComponent>


                <OverviewCardComponent title={"To be contacted"} description={"30 days to contact: "}
                                       numberCount={5} violationStatus={false}
                ></OverviewCardComponent>



            </div>
        </>
    );
}


export default OverviewCardComponent;