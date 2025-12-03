export interface OverviewCardProps {
  title: string;
  description: string;
  numberCount: number;
  violationStatus: boolean;
  priority?: priorityStatus;
  icon?: React.ElementType;
}
export type priorityStatus = "Urgent" | "Important" | "Normal";

export function OverviewCard({
  title,
  description,
  numberCount,
  violationStatus,
  priority,
}: OverviewCardProps) {
  return (
    <>
      {" "}
      {/*<div className="border rounded-xl p-4 w-64 sm:w-32 md:w-72 lg:w-64 bg-slate-50 text-neutral-300">
                <div className="border rounded-xl p-4 w-full h-28 bg-slate-50 text-neutral-300">

    */}
      <div className="border border-gray-200 rounded-xl p-4 w-full bg-white text-neutral-300 shadow-sm">
        <div className="text-slate-700">
          <div className={"justify-items-start font-semibold "}>
            <p>{title} </p>{" "}
          </div>
          <div className={"justify-items-start row pb-0 pt-4  "}>
            <p>
              {description}
              <span>{numberCount}</span>
            </p>
          </div>
          {violationStatus && (
            /*<div className={" justify-items-start bg-[#D32F2F] text-white py-3 text-sm rounded-b-xl p-4 w-64"}>*/
            <div className=" justify-items-start bg-[#D32F2F] text-white py-1.75 text-sm rounded-b-xl pt-1 px-4 -mx-4 -mb-10">
              {priority && <p>Priority: {priority}</p>}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default OverviewCard;
