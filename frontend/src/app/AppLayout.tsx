import { Outlet, useMatches } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../shared/components/Sidebar";

export default function AppLayout() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const matches = useMatches();

    useEffect(() => {
        const last = matches[matches.length - 1];
        document.title = (last?.handle as any)?.title ?? "ComplianceHub";
    }, [matches]);

    return (
        // Parent flex container: Sidebar is a sibling (left column), main fills remaining space
        <div className="min-h-screen flex bg-gray-100">
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                toggle={() => setIsSidebarCollapsed((v) => !v)}
            />

            <main className="flex-1 transition-all p-6">
                {/* Use the available width — don't center-limit this wrapper unless you intend to */}
                <div className="w-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}