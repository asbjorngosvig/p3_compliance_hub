export interface OverviewCardProps {
  title: string;
  description: string;
  numberCount: number;
  violationStatus: boolean;
  priority?: priorityStatus;
  Icon?: React.ElementType;
}
export type priorityStatus = "Urgent" | "Important" | "Normal";

export function OverviewCard({
  title,
  description,
  numberCount,
  violationStatus,
  priority,
  Icon,
}: OverviewCardProps) {
  return (
    <>
      {" "}
      {/*<div className="border rounded-xl p-4 w-64 sm:w-32 md:w-72 lg:w-64 bg-slate-50 text-neutral-300">
                <div className="border rounded-xl p-4 w-full h-28 bg-slate-50 text-neutral-300">

    */}
        <div className="border border-[#88AA30] rounded-xl p-4 w-full bg-white text-neutral-300 shadow-sm">
          <div className="text-slate-700">

            <div className="flex items-start justify-between">
              <p className="font-semibold">{title}</p>
              {Icon && <Icon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />}
            </div>

            <div className="pb-0 pt-4">
              <p>
                {description}
                <span>{numberCount}</span>
              </p>
            </div>

          </div>
        </div>
    </>
  );
}

export default OverviewCard;
