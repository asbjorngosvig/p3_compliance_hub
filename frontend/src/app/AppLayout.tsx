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


      <main className={`min-h-screen flex-1 transition-all ${isSidebarCollapsed ? "ml-16" : "ml-64"}`}>
        <div className={`flex-1 transition-all duration-300 ${
                        isSidebarCollapsed ? 'pl-16' : 'pl-64'} xl:-mx-20 md:-mx-0`}>

      <Sidebar 
      isCollapsed={isSidebarCollapsed} 
      toggle={() => setIsSidebarCollapsed(v => !v)} />
      </div>
        <Outlet />
      </main>
      
  );
}
