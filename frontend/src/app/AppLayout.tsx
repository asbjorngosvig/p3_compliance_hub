import { Outlet, useMatches } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../shared/components/Sidebar";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const matches = useMatches();

  useEffect(() => {
    const last = matches[matches.length - 1];
    document.title = (last?.handle as any)?.title ?? "ComplianceHub";
  }, [matches]);

  return (
    <div className="flex">
      <Sidebar isCollapsed={collapsed} toggle={() => setCollapsed(v => !v)} />
      <main className={`min-h-screen flex-1 transition-all ${collapsed ? "ml-16" : "ml-64"}`}>
        <Outlet />
      </main>
    </div>
  );
}
