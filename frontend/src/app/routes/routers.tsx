/*
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense, type ReactElement } from "react";
import AppLayout from "../AppLayout";

const S = (el: ReactElement) => (
  <Suspense fallback={<div>Loading…</div>}>{el}</Suspense>
);

const Dashboard      = lazy(() => import("../../features/dashboard/Dashboard"));
const DataProcessors = lazy(() => import("../../features/dataprocessors/ListView"));
const Employees      = lazy(() => import("../../features/employees/Employees"));

export const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      children: [
        { index: true, element: S(<Dashboard />), handle: { title: "Home" } },
        { path: "dataprocessors", element: S(<DataProcessors />), handle: { title: "Data Processors" } },
        { path: "employees", element: S(<Employees />), handle: { title: "Employees" } },
      ],
    },
  ],
  { basename: import.meta.env.VITE_BASENAME || "/" }
);
*/