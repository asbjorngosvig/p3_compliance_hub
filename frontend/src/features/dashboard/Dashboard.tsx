import { OverviewHeader } from "../../shared/components/OverviewHeader.tsx";
import DpaOverview from "../dpas/DpaOverview";

export function Dashboard() {
    return (
        <div className="p-6 space-y-6">
            <OverviewHeader />
            <DpaOverview />
        </div>
    );
}

export default Dashboard;
