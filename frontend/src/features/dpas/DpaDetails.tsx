import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type DpaStatus = "Compliant" | "Violation" | "Pending";

interface DpaDetailsData {
    id: number;
    name: string;
    status: DpaStatus;
    priority: string;
    action: string;
    timeframe: string;
    processor: string;
    hostingLocation: string;
    contractualSafeguard: string;
    serviceType: string;
}

const statusBadgeClasses: Record<DpaStatus, string> = {
    Compliant: "bg-emerald-100 text-emerald-700",
    Violation: "bg-red-100 text-red-700",
    Pending: "bg-amber-100 text-amber-700",
};

const DpaDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Dummy data – senere skifter du til API-kald
    const [data, setData] = useState<DpaDetailsData | null>(null);

    useEffect(() => {
        // Her laver du GET /api/dpas/:id når backend er klar
        // Lige nu: mocked eksempel

        setData({
            id: Number(id),
            name: "DTU",
            status: "Violation",
            priority: "Urgent",
            action: "Terminate",
            timeframe: "ASAP",
            processor: "Microsoft Azure",
            hostingLocation: "Denmark",
            contractualSafeguard: "Standard Contracts",
            serviceType: "Cloud Hosting",
        });
    }, [id]);

    if (!data) {
        return (
            <div className="p-10 text-center text-slate-500">
                Loading DPA details...
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Top bar */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight">
                    DPA Details – {data.name}
                </h1>

                <div className="flex gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="rounded-full bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300"
                    >
                        Back
                    </button>

                    <button
                        className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
                    >
                        Edit
                    </button>

                    <button className="rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-200">
                        Delete
                    </button>
                </div>
            </div>

            {/* Status card */}
            <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-lg font-semibold">Overview</h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-xl border p-4">
                        <p className="text-sm text-slate-500">Status</p>
                        <span
                            className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${statusBadgeClasses[data.status]}`}
                        >
              {data.status}
            </span>
                    </div>

                    <div className="rounded-xl border p-4">
                        <p className="text-sm text-slate-500">Priority</p>
                        <p className="font-medium">{data.priority}</p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <p className="text-sm text-slate-500">Action</p>
                        <p className="font-medium">{data.action}</p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <p className="text-sm text-slate-500">Timeframe</p>
                        <p className="font-medium">{data.timeframe}</p>
                    </div>

                </div>
            </div>

            {/* Information card */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-lg font-semibold">Processing Information</h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border p-4">
                        <p className="text-sm text-slate-500">Processor</p>
                        <p className="font-medium">{data.processor}</p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <p className="text-sm text-slate-500">Hosting Location</p>
                        <p className="font-medium">{data.hostingLocation}</p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <p className="text-sm text-slate-500">Contractual Safeguard</p>
                        <p className="font-medium">{data.contractualSafeguard}</p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <p className="text-sm text-slate-500">Service Type</p>
                        <p className="font-medium">{data.serviceType}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DpaDetails;
