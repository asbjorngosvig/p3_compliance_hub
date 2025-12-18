import { Outlet, useMatches, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../shared/components/Sidebar";
import { authService } from "../shared/services/AuthService";

export default function AppLayout() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const matches = useMatches();
    const navigate = useNavigate();

    useEffect(() => {
        const last = matches[matches.length - 1];
        document.title = (last?.handle as any)?.title ?? "ComplianceHub";


        login();

    }, [matches]);
    
    async function login(){
        try {
            await authService.checkIfLoggedIn();
        } catch {
            navigate("/") // navigate back to login, if not logged in
        }
    }

    return (
        // Parent flex container: Sidebar is a sibling (left column), main fills remaining space
        <div className="flex min-h-screen w-screen overflow-hidden bg-gray-100">
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                toggle={() => setIsSidebarCollapsed((v) => !v)}
            />

            <main className="flex-1 min-w-0 overflow-y-auto pr-6 pl-6 transition-all">
                {/* Use the available width — don't center-limit this wrapper unless you intend to */}
                <div className="">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}