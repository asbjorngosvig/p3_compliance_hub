import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense, type ReactElement } from "react";
import AppLayout from "../AppLayout";

const S = (el: ReactElement) => (
    <Suspense fallback={<div>Loading…</div>}>{el}</Suspense>
);

const Dashboard          = lazy(() => import("../../features/dashboard/Dashboard"));
const DataProcessors     = lazy(() => import("../../features/dataProcessors/SeeDataProcessors"));
const AddDataProcessor   = lazy(() => import("../../features/dataProcessors/AddDataProcessor"));
const Employees          = lazy(() => import("../../features/employees/Employees"));
const AddDpa             = lazy(() => import("../../features/addDpa/AddDpa"));
const Settings           = lazy(() => import("../../features/settings/Settings"));
const Login              = lazy(() => import("../../features/login/Login"));
const DpaOverview        = lazy(() => import("../../features/dpas/DpaOverview"));
const DpaDetails         = lazy(() => import("../../features/dpas/DpaDetails"));

export const router = createBrowserRouter(
    [
        {
            index: true,
            element: S(<Login />),
            handle: { title: "Login" }
        },
        {
            element: <AppLayout />,
            children: [
                { path: "dashboard",          element: S(<Dashboard />),        handle: { title: "Home" } },
                { path: "dataprocessors",     element: S(<DataProcessors />),   handle: { title: "Data Processors" } },
                { path: "dataprocessors/add", element: S(<AddDataProcessor />), handle: { title: "Add Data Processor" } },
                { path: "employees",          element: S(<Employees />),        handle: { title: "Employees" } },
                { path: "adddpa",             element: S(<AddDpa />),           handle: { title: "Add DPA" } },

                { path: "dpas",               element: S(<DpaOverview />),      handle: { title: "DPAs and Violations" } },
                { path: "dpas/:id",           element: S(<DpaDetails />),       handle: { title: "DPA Details" } },

                { path: "settings",           element: S(<Settings />),         handle: { title: "Settings" } },
            ],
        },
    ],
    { basename: import.meta.env.VITE_BASENAME || "/" }
);
